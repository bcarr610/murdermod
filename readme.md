# MurderMOD
CLI tool that murders all those pesky node modules folders.

## Installation
```javascript
npm i murdermod -g
```

## Usage

```murdermod [action] [args]```

## Allowed Arguments
| Name | Usage | Description |
|:------------------|:------------|:----------------|
| Help              | `help`      | Print help menu |
| Kill              | `kill`      | Murders node modules |
| Add              | `add`      | Add a path to search for modules in. |
| Remove              | `remove`      | Remove an existing search path |
| Ignore              | `ignore`      | Add text to ignore when searching for modules |
| Dont Ignore              | `dontIgnore`      | Remove existing ignore text |
| Reset Config?              | `resetConfig`      | Completely remove all saved configuration data. |
| List              | `list`      | List all currently saved configuration data. |

---

## Examples
Get Help
```PowerShell
murdermod
```
```PowerShell
murdermod help
```

Kill Node modules
```PowerShell
murdermod kill
```

Add search path
```PowerShell
murdermod add C:/Users/username/Projects
```

Remove search path
```PowerShell
murdermod remove C:/Users/username/Projects
```

Add ignore text
```PowerShell
murdermod ignore .git
```

Remove ignore text
```PowerShell
murdermod dontIgnore src
```

List saved configuration
```PowerShell
murdermod list
```

Remove saved configuration
```PowerShell
murdermod resetConfig
```

---
