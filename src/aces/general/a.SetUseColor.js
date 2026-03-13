export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Use Color Fill",
  displayText: "Use Color Fill: [i]{0}[/i]",
  description:
    "Whether the addon uses the color to fill the object or not (will override sprite source use)",
  params: [
    {
      id: "use-color-fill",
      name: "Use Color Fill",
      desc: "Whether to use the color as a solid fill or not",
      type: "boolean",
      initialValue: "false",
    },
  ],
};

export const expose = false;

export default function (fill) {
  this._SetUseColor(fill);
}
