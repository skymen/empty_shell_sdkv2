export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Origin",
  displayText: "Set the origin to [i]{0}[/i], [i]{1}[/i]",
  description: "Set the origin",
  params: [
    {
      id: "hotspot-x",
      name: "Origin X",
      desc: "The origin x coordinate (0-1)",
      type: "number",
      initialValue: "0",
    },
    {
      id: "hotspot-y",
      name: "Origin Y",
      desc: "The origin y coordinate (0-1)",
      type: "number",
      initialValue: "0",
    },
  ],
};

export const expose = true;

export default function (x, y) {
  this._SetOrigin(x, y);
}
