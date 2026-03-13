export const config = {
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Set Source",
  displayText:
    "Set the source to [i]{0}[/i] (keep sync: [i]{1}[/i], sync size: [i]{2}[/i], fallback: [i]{3}[/i], sync origin: [i]{4}[/i])",
  description: "Set the source object",
  params: [
    {
      id: "source",
      name: "Source",
      desc: "The source object",
      type: "object",
      allowedPluginIds: ["Sprite"],
    },
    {
      id: "keep-sync",
      name: "Keep Sync",
      desc: "Keep the object synced to the source",
      type: "boolean",
      initialValue: "false",
    },
    {
      id: "sync-size",
      name: "Sync Size",
      desc: "How to sync the size",
      type: "combo",
      initialValue: "no-sync",
      items: [
        { "no-sync": "No Sync" },
        { "sprite-size": "Sync with Sprite Size" },
        { "image-size": "Sync with Image Size" },
      ],
    },
    {
      id: "fallback",
      name: "Fallback",
      desc: "If keeping sync, what to do if source is destroyed",
      type: "combo",
      initialValue: "item1",
      items: [
        { item1: "Destroy with source" },
        { item2: "Fallback on another instance or destroy" },
        { item3: "Fallback on another instance or reset" },
        { item4: "Reset image" },
      ],
    },
    {
      id: "sync-origin",
      name: "Sync Origin",
      desc: "Whether to sync the origin",
      type: "boolean",
      initialValue: "false",
    },
  ],
};

export const expose = false;

export default function (object, keepSync, syncSize, fallback, syncOrigin) {
  this._SetSource(object, keepSync, syncSize, fallback, syncOrigin);
}
