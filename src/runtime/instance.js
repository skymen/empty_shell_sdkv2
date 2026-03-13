import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();

      this.hotspotX = 0.5;
      this.hotspotY = 0.5;
      this.useColorFill = false;

      if (properties) {
        this.hotspotX = properties[0];
        this.hotspotY = properties[1];
        this.useColorFill = properties[2];
      }

      this.source = null;
      this.sourceTex = null;
      this.sourceObject = null;
      this.keepSync = false;
      this.syncSize = 0;
      this.fallback = 3;
      this.syncOrigin = false;
      this.rcQuad = C3.New(C3.Quad);
      this.firstTick = this.useColorFill;
      this.tempColor = C3.New(C3.Color);
      if (this.firstTick) this._startTicking();

      this._SetOrigin(this.hotspotX, this.hotspotY);
    }

    _SetOrigin(x, y) {
      const wi = this._getWorldInfo();
      wi.SetOriginX(x);
      wi.SetOriginY(y);
      this.hotspotX = x;
      this.hotspotY = y;
      wi.SetBboxChanged();
    }

    _SetSource(object, keepSync, syncSize, fallback, syncOrigin) {
      const inst = object.GetPairedInstance(this._inst);
      if (!inst) return false;

      const sdkInst = inst.GetSdkInstance();
      if (!sdkInst) return false;

      if (
        !C3.Plugins.Sprite ||
        !(sdkInst instanceof C3.Plugins.Sprite.Instance)
      )
        return;

      this.source = null;
      this.sourceTex = null;
      this.sourceObject = object;
      this.keepSync = keepSync;
      this.syncSize = syncSize;
      this.fallback = fallback;
      this.syncOrigin = syncOrigin;

      if (this.keepSync) {
        this.source = sdkInst;
        this._startTicking();
      } else {
        this.sourceTex = sdkInst.GetTexture();
        this.rcQuad.copy(sdkInst.GetTexQuad());
        this._stopTicking();
      }

      const wi = this._getWorldInfo();
      const sourceWi = sdkInst.GetWorldInfo();
      const sourceImageInfo = sdkInst.GetCurrentImageInfo();

      if (this.syncSize === 1) {
        wi.SetSize(sourceWi.GetWidth(), sourceWi.GetHeight());
      } else if (this.syncSize === 2) {
        wi.SetSize(sourceImageInfo.GetWidth(), sourceImageInfo.GetHeight());
      }

      if (this.syncOrigin) {
        this._SetOrigin(sourceWi.GetOriginX(), sourceWi.GetOriginY());
      }

      if (this.syncSize > 0) {
        wi.SetBboxChanged();
      }

      return true;
    }

    _TryFallBack() {
      return this._SetSource(
        this.sourceObject,
        this.keepSync,
        this.syncSize,
        this.fallback,
        this.syncOrigin
      );
    }

    _ResetImage() {
      this.source = null;
      this.sourceTex = null;
      this.sourceObject = null;
      this._stopTicking();
    }

    _Destroy() {
      this._stopTicking();
      this._runtime.DestroyInstance(this);
    }

    _tick() {
      if (this.firstTick) {
        this.firstTick = false;
        this._UpdateRendererStateGroup();
      }
      if (this.source === null) {
        this._stopTicking();
        return;
      }

      if (!this.source._inst) {
        if (this.fallback === 0) {
          this._Destroy();
          return;
        } else if (this.fallback === 1) {
          if (!this._TryFallBack()) {
            this._Destroy();
            return;
          }
        } else if (this.fallback === 2) {
          if (!this._TryFallBack()) {
            this._ResetImage();
            return;
          }
        } else if (this.fallback === 3) {
          this._ResetImage();
          return;
        }
      }

      if (this.keepSync) {
        const sourceWi = this.source.GetWorldInfo();
        const wi = this._getWorldInfo();
        const sourceImageInfo = this.source.GetCurrentImageInfo();

        if (this.syncSize === 1) {
          wi.SetSize(sourceWi.GetWidth(), sourceWi.GetHeight());
        } else if (this.syncSize === 2) {
          wi.SetSize(sourceImageInfo.GetWidth(), sourceImageInfo.GetHeight());
        }

        if (this.syncOrigin) {
          this._SetOrigin(sourceWi.GetOriginX(), sourceWi.GetOriginY());
        }

        if (this.syncSize > 0) {
          wi.SetBboxChanged();
        }
      }
    }

    _draw(renderer) {
      if (this.useColorFill) {
        renderer.SetColorFillMode();
        const wi = this._getWorldInfo();
        const quad = wi.GetBoundingQuad();
        this.tempColor.copy(wi._color);
        this.tempColor.premultiply();
        renderer.SetColor(this.tempColor);
        if (this._runtime.IsPixelRoundingEnabled()) {
          const tempQuad = C3.New(C3.Quad);
          const ox = Math.round(wi.GetX()) - wi.GetX();
          const oy = Math.round(wi.GetY()) - wi.GetY();
          tempQuad.copy(quad);
          tempQuad.offset(ox, oy);
          renderer.Quad(tempQuad);
        } else {
          renderer.Quad(quad);
        }
        return;
      }

      const texture =
        this.sourceTex || (this.source && this.source.GetTexture());

      if (!texture) return;

      const wi = this._getWorldInfo();
      let quad = wi.GetBoundingQuad();
      const rcQuad = this.source
        ? this.source.GetCurrentImageInfo().GetTexQuad()
        : this.rcQuad;

      renderer.SetTexture(texture);

      if (this._runtime.IsPixelRoundingEnabled())
        quad = wi.PixelRoundQuad(quad);
      renderer.Quad4(quad, rcQuad);
    }

    _UpdateRendererStateGroup() {
      const renderer = this._runtime.GetRenderer();
      const wi = this._getWorldInfo();
      if (wi._stateGroup) renderer.ReleaseStateGroup(wi._stateGroup);
      let shaderProgram;
      if (this.useColorFill) shaderProgram = renderer._spColorFill || "<fill>";
      else
        shaderProgram = renderer.GetTextureFillShaderProgram() || "<default>";
      wi._stateGroup = renderer.AcquireStateGroup(
        shaderProgram,
        wi.GetBlendMode(),
        wi._colorPremultiplied,
        wi.GetZElevation()
      );
    }

    _SetUseColor(fill) {
      this.useColorFill = fill;
      if (fill && this.source) this.source = null;
      this._UpdateRendererStateGroup();
    }

    _Clear() {
      this.useColorFill = false;
      this.source = null;
    }

    _SetBlendMode(bm) {
      this._getWorldInfo().SetBlendMode(bm);
      this._runtime.UpdateRender();
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {};
    }

    _loadFromJson(o) {
      // load state for savegames
    }
  };
}
