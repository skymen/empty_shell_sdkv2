<img src="./examples/cover.webp" width="150" /><br>
# Empty Shell
<i>An empty shell addon that can be given a texture</i> <br>
### Version 2.0.0.1

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/empty_shell_sdkv2/releases/download/skymen_Shell-2.0.0.1.c3addon/skymen_Shell-2.0.0.1.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/empty_shell_sdkv2/releases) </sub> <br>

#### What's New in 2.0.0.1
**Fixed:**
Added an if statement to prevent hack if it would break

<sub>[View full changelog](#changelog)</sub>

---
<b><u>Author:</u></b> skymen <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files
| Description | Download |
| --- | --- |

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Origin X | X Coordinate (0-1) | float |
| Origin Y | Y Coordinate (0-1) | float |
| Use Color Fill | Whether to use the color as a solid fill or not | check |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Set Blend Mode | Set the blend mode | Blend Mode             *(combo)* <br> |
| Clear | Clear the object |  |
| Set Origin | Set the origin | Origin X             *(number)* <br>Origin Y             *(number)* <br> |
| Set Source | Set the source object | Source             *(object)* <br>Keep Sync             *(boolean)* <br>Sync Size             *(combo)* <br>Fallback             *(combo)* <br>Sync Origin             *(boolean)* <br> |
| Use Color Fill | Whether the addon uses the color to fill the object or not (will override sprite source use) | Use Color Fill             *(boolean)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Has source | Test if the object has a source object |  |
| Keeps sync | Test if the object keeps sync with the source object |  |
| Uses color fill | Test if the object uses the color as a solid fill |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| HotspotX | Get the hotspot x coordinate | number |  | 
| HotspotY | Get the hotspot y coordinate | number |  | 


---
## Changelog

### Version 2.0.0.1

**Fixed:**
Added an if statement to prevent hack if it would break
---

### Version 2.0.0.0

**Added:**
Ported to SDK V2

---

### Version 0.0.0.0

**Added:**
Initial release.

---
