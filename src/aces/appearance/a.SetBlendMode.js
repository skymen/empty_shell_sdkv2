export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Blend Mode",
  displayText: "Set the blend mode to [i]{0}[/i]",
  description: "Set the blend mode",
  params: [
    {
      id: "blend-mode",
      name: "Blend Mode",
      desc: "The blend mode to use",
      type: "combo",
      initialValue: "normal",
      items: [
        { normal: "Normal" },
        { additive: "Additive" },
        { xor: "Xor" },
        { copy: "Copy" },
        { "destination-over": "Destination over" },
        { "source-in": "Source in" },
        { "destination-in": "Destination in" },
        { "source-out": "Source out" },
        { "destination-out": "Destination out" },
        { "source-atop": "Source atop" },
        { "destination-atop": "Destination atop" },
      ],
    },
  ],
};

export const expose = false;

export default function (bm) {
  this._SetBlendMode(bm);
}
