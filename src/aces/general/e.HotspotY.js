export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the hotspot y coordinate",
  params: [],
};

export const expose = true;

export default function () {
  return this.hotspotY;
}
