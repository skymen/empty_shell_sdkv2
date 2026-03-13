export const config = {
  highlight: false,
  deprecated: false,
  listName: "Keeps sync",
  displayText: "Keeps sync",
  description: "Test if the object keeps sync with the source object",
  params: [],
};

export const expose = true;

export default function () {
  return !!(this.source || this.sourceTex) && this.keepSync;
}
