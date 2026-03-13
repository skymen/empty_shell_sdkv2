export const config = {
  highlight: false,
  deprecated: false,
  listName: "Has source",
  displayText: "Has source",
  description: "Test if the object has a source object",
  params: [],
};

export const expose = true;

export default function () {
  return !!(this.source || this.sourceTex);
}
