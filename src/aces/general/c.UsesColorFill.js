export const config = {
  highlight: false,
  deprecated: false,
  listName: "Uses color fill",
  displayText: "Uses color fill",
  description: "Test if the object uses the color as a solid fill",
  params: [],
};

export const expose = true;

export default function () {
  return this.useColorFill;
}
