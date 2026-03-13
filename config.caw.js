import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.PLUGIN;
export const type = PLUGIN_TYPE.WORLD;
export const id = "skymen_Shell";
export const name = "Empty Shell";
export const version = _version;
export const minConstructVersion = undefined;
export const author = "skymen";
export const website = "https://www.construct.net";
export const documentation = "https://www.construct.net";
export const description = "An empty shell addon that can be given a texture";
export const category = ADDON_CATEGORY.GENERAL;

export const hasDomside = false;
export const files = {
  extensionScript: {
    enabled: false,
    watch: true,
    targets: ["x86", "x64"],
    name: "MyExtension",
  },
  fileDependencies: [],
  remoteFileDependencies: [],
  cordovaPluginReferences: [],
  cordovaResourceFiles: [],
};

// categories that are not filled will use the folder name
export const aceCategories = {
  general: "General",
  appearance: "Appearance",
};

export const info = {
  // icon: "icon.svg",
  // defaultImageUrl: "default-image.png",
  Set: {
    // COMMON to all
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,

    // BEHAVIOR only
    IsOnlyOneAllowed: false,

    // PLUGIN world only
    IsResizable: true,
    IsRotatable: true,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: true,
    SupportsColor: true,
    SupportsEffects: true,
    MustPreDraw: false,

    // PLUGIN object only
    IsSingleGlobal: false,
  },
  // PLUGIN only
  AddCommonACEs: {
    Position: true,
    SceneGraph: true,
    Size: true,
    Angle: true,
    Appearance: true,
    ZOrder: true,
  },
};

export const properties = [
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "hotspot-x",
    options: {
      initialValue: 0.5,
      interpolatable: false,
    },
    name: "Origin X",
    desc: "X Coordinate (0-1)",
  },
  {
    type: PROPERTY_TYPE.FLOAT,
    id: "hotspot-y",
    options: {
      initialValue: 0.5,
      interpolatable: false,
    },
    name: "Origin Y",
    desc: "Y Coordinate (0-1)",
  },
  {
    type: PROPERTY_TYPE.CHECK,
    id: "use-color-fill",
    options: {
      initialValue: false,
      interpolatable: false,
    },
    name: "Use Color Fill",
    desc: "Whether to use the color as a solid fill or not",
  },
];
