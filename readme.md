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
| Kill              | `[k, kill]`      | Murders node modules |
| Add              | `[a, add]`      | Add a path to search for modules in. |
| Remove              | `[r, remove]`      | Remove an existing search path |
| Ignore              | `[i, ignore]`      | Add text to ignore when searching for modules |
| Dont Ignore              | `[ri, removeIgnore]`      | Remove existing ignore text |
| Reset Config              | `resetConfig`      | Completely remove all saved configuration data. |
| List              | `[l, li, list]`      | List all currently saved configuration data. |
| Version              | `[v, ver, version]`      | Display current version. |
| Update              | `[u, update]`      | Update to current murdermod version. |


---

## Examples
Get Help
```PowerShell
murdermod
```

Kill Node modules
```PowerShell
murdermod k
```

Add search path
```PowerShell
murdermod a C:/Users/username/Projects
```

Remove search path
```PowerShell
murdermod r C:/Users/username/Projects
```

Add ignore text
```PowerShell
murdermod i .git
```

Remove ignore text
```PowerShell
murdermod ri src
```

List saved configuration
```PowerShell
murdermod l
```

Remove saved configuration
```PowerShell
murdermod resetConfig
```

Display version
```PowerShell
murdermod v
```

Update cli
```PowerShell
murdermod u
```

---
