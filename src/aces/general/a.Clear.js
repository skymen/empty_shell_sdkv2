export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Clear",
  displayText: "Clear the object",
  description: "Clear the object",
  params: [],
};

export const expose = false;

export default function () {
  this._Clear();
}
