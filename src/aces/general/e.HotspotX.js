export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the hotspot x coordinate",
  params: [],
};

export const expose = true;

export default function () {
  return this.hotspotX;
}
