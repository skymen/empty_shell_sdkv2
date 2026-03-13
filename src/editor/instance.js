export default function (instanceClass) {
  return class extends instanceClass {
    constructor(sdkType, inst) {
      super(sdkType, inst);
    }

    Release() {}

    OnCreate() {
      this.UpdateOrigin();
    }

    OnPlacedInLayout() {}

    Draw(iRenderer, iDrawParams) {
      iRenderer.SetColorFillMode();
      iRenderer.SetColor(this._inst.GetColor());
      const useColorFill = this._inst.GetPropertyValue("use-color-fill");
      if (useColorFill) {
        iRenderer.Quad(this._inst.GetQuad());
      } else {
        iRenderer.PushLineWidth(4);
        iRenderer.PushLineCap("square");
        iRenderer.LineQuad(this._inst.GetQuad());
        iRenderer.PopLineWidth();
        iRenderer.PopLineCap();
      }
    }

    IsOriginalSizeKnown() {
      return false;
    }

    HasDoubleTapHandler() {
      return false;
    }

    OnDoubleTap() {}

    UpdateOrigin() {
      this._inst.SetOrigin(
        this._inst.GetPropertyValue("hotspot-x"),
        this._inst.GetPropertyValue("hotspot-y")
      );
    }

    OnPropertyChanged(id, value) {
      if (id === "hotspot-x" || id === "hotspot-y") {
        this.UpdateOrigin();
      }
    }

    LoadC2Property(name, valueString) {
      return false;
    }
  };
}
