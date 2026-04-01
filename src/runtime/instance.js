import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  let globalRuntime = null;
  if (typeof self !== "undefined" && self.C3?.Plugins?.Sprite?.Instance) {
    self.C3.Plugins.Sprite.Instance = class SpriteInstance extends (
      self.C3.Plugins.Sprite.Instance
    ) {
      constructor(...args) {
        super(...args);
        globalRuntime = this._runtime;
      }
    };
  }

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
      this.rcQuad = null;
      this.firstTick = this.useColorFill;
      if (this.firstTick) this._setTicking(true);

      this._SetOrigin(this.hotspotX, this.hotspotY);
    }

    _trigger(method) {
      this.dispatch(method);
      super._trigger(self.C3[AddonTypeMap[addonType]][id].Cnds[method]);
    }

    on(tag, callback, options) {
      if (!this.events[tag]) {
        this.events[tag] = [];
      }
      this.events[tag].push({ callback, options });
    }

    off(tag, callback) {
      if (this.events[tag]) {
        this.events[tag] = this.events[tag].filter(
          (event) => event.callback !== callback,
        );
      }
    }

    dispatch(tag) {
      if (this.events[tag]) {
        this.events[tag].forEach((event) => {
          if (event.options && event.options.params) {
            const fn = self.C3[AddonTypeMap[addonType]][id].Cnds[tag];
            if (fn && !fn.call(this, ...event.options.params)) {
              return;
            }
          }
          event.callback();
          if (event.options && event.options.once) {
            this.off(tag, event.callback);
          }
        });
      }
    }

    _SetOrigin(x, y) {
      this.setOrigin(x, y);
      this.hotspotX = x;
      this.hotspotY = y;
    }

    _SetSource(object, keepSync, syncSize, fallback, syncOrigin) {
      const inst = object.getPairedInstance(this);
      if (!inst) return false;

      if (!self.ISpriteInstance || !(inst instanceof self.ISpriteInstance))
        return false;

      this.source = null;
      this.sourceTex = null;
      this.sourceObject = object;
      this.keepSync = keepSync;
      this.syncSize = syncSize;
      this.fallback = fallback;
      this.syncOrigin = syncOrigin;

      const texture = this.runtime.renderer.getTextureForImageInfo(
        inst.animation.getFrames()[inst.animationFrame],
      );

      if (this.keepSync) {
        this.source = inst;
        this._setTicking(true);
      } else {
        this.sourceTex = texture;
        this.rcQuad = this._getRcQuadForInst(inst);
        this._setTicking(false);
      }

      if (this.syncSize === 1) {
        this.setSize(inst.width, inst.height);
      } else if (this.syncSize === 2) {
        this.setSize(inst.imageWidth, inst.imageHeight);
      }

      if (this.syncOrigin) {
        this._SetOrigin(inst.originX, inst.originY);
      }

      return true;
    }

    _TryFallBack() {
      return this._SetSource(
        this.sourceObject,
        this.keepSync,
        this.syncSize,
        this.fallback,
        this.syncOrigin,
      );
    }

    _ResetImage() {
      this.source = null;
      this.sourceTex = null;
      this.sourceObject = null;
      this._setTicking(false);
    }

    _getSourceTexture() {
      if (this.source) {
        return this.runtime.renderer.getTextureForImageInfo(
          this.source.animation.getFrames()[this.source.animationFrame],
        );
      } else if (this.sourceTex) {
        return this.sourceTex;
      }
      return null;
    }

    _Destroy() {
      this._setTicking(false);
      this._runtime.DestroyInstance(this);
    }

    _tick() {
      if (this.firstTick) {
        this.firstTick = false;
      }
      if (this.source === null) {
        this._setTicking(false);
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
        if (this.syncSize === 1) {
          this.setSize(this.source.width, this.source.height);
        } else if (this.syncSize === 2) {
          this.setSize(this.source.imageWidth, this.source.imageHeight);
        }

        if (this.syncOrigin) {
          this._SetOrigin(this.source.originX, this.source.originY);
        }
      }
    }

    _draw(renderer) {
      renderer.setColorRgba(
        this.colorRgb[0],
        this.colorRgb[1],
        this.colorRgb[2],
        this.opacity,
      );
      if (this.useColorFill) {
        renderer.setColorFillMode();
        const quad = this.getBoundingQuad();
        if (this.runtime.isPixelRoundingEnabled) {
          const ox = Math.round(this.x) - this.x;
          const oy = Math.round(this.y) - this.y;
          quad.p1.x += ox;
          quad.p1.y += oy;
          quad.p2.x += ox;
          quad.p2.y += oy;
          quad.p3.x += ox;
          quad.p3.y += oy;
          quad.p4.x += ox;
          quad.p4.y += oy;
        }
        renderer.quad(quad);
        return;
      }

      const texture = this._getSourceTexture();

      if (!texture) return;

      renderer.setTextureFillMode();
      renderer.setTexture(texture);
      renderer.quad4(this.getBoundingQuad(), this._getRcQuad());
    }

    _getRcQuadForInst(inst) {
      //TODO: This uses a hack
      const sdkInst = globalRuntime.GetInstanceByUID(inst.uid)._sdkInst;
      if (!sdkInst) return null;
      return sdkInst.GetTexQuad().toDOMQuad();
    }

    _getRcQuad() {
      const rcQuad = this.source
        ? this._getRcQuadForInst(this.source)
        : this.rcQuad;
      if (this.runtime.isPixelRoundingEnabled) {
        const ox = Math.round(this.x) - this.x;
        const oy = Math.round(this.y) - this.y;
        rcQuad.p1.x += ox;
        rcQuad.p1.y += oy;
        rcQuad.p2.x += ox;
        rcQuad.p2.y += oy;
        rcQuad.p3.x += ox;
        rcQuad.p3.y += oy;
        rcQuad.p4.x += ox;
        rcQuad.p4.y += oy;
      }
      return rcQuad;
    }

    _SetUseColor(fill) {
      this.useColorFill = fill;
      if (fill && this.source) this.source = null;
    }

    _Clear() {
      this.useColorFill = false;
      this.source = null;
    }

    _SetBlendMode(bm) {
      debugger;
      this.blendMode = bm;
      this.runtime.sdk.updateRender();
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
