# MurderMOD
Node module cleaning CLI.

## What it does
MurderMOD allows you to specify search paths to looks for node modules and remove them. You can add keywords to ignore such as `.git` directories and paths to ignore. Your paths and keywords are stored locally so you only need to add them once. You can fire of the `kill` command to remove all modules found in your path search or `kill --snipe` to remove a specific module directory. See examples below.

## Installation
```javascript
npm i murdermod -g
```

## Help
```PowerShell
murdermod --help
```

## Usage
```murdermod <command> [args]```

<br>

# Commands
## `add`
_Add search paths, keywords and/or paths to exclude from the node module search._
### Command Variations
+ `add`
### Arguments
| Argument            | Shorthand | Type | Description |
|:------------------- |:--------- |:---- |:----------- |
| paths             | -p        | Array | Adds search paths for murdermod to look for node modules. Multiple paths can be added simultaneously by separating them with spaces. |
| ignoreKeywords    | -i | Array | Adds keywords for murdermod to ignore when searching through the search paths. Multiple keywords can be added simultaneously by separating them with spaces. |
| excludePaths | -e | Array | Adds paths to exclude during node module search, multiple paths cann be added simultaneously by separating them with spaces |
### Examples
```PowerShell

# Add current directory to search paths (with shorthand)
murdermod add -p .

# Add single search path (no shorthand)
murdermod add --paths C:/Users/username/Projects

# Add 2 paths and 1 ignore keyword (with shorthand)
murdermod add -p ./myTestProject C:/Users/username/Projects -i .git

# Add ignore keyword and exclude path (with shorthand)
murdermod add -i src -e C:/Users/username/someFolder

```

---

## `remove`
_Remove search paths, keywords and/or paths to exclude from the node module search._
### Command Variations
+ `remove`
+ `rm`
### Arguments
| Argument            | Shorthand | Type | Description |
|:------------------- |:--------- |:---- |:----------- |
| paths             | -p        | Array | Removes search paths for murdermod to look for node modules. Multiple paths can be added simultaneously by separating them with spaces. |
| ignoreKeywords    | -i | Array | Removes keywords for murdermod to ignore when searching through the search paths. Multiple keywords can be added simultaneously by separating them with spaces. |
| excludePaths | -e | Array | Removes paths to exclude during node module search, multiple paths cann be added simultaneously by separating them with spaces |
### Examples
```PowerShell

# Remove current directory to search paths
murdermod remove -p .

# Remove all search paths
murdermod rm --paths *

# Remove all paths, keywords and exclude paths
murdermod rm *

# Remove 1 path, 2 keywords and all exclude paths
murdermod rm -p C:/users/username/Projects -i .git src -e *

```

---

## `list`
_List saved search paths, keywords and/or excluded paths._
### Command Variations
+ `list`
+ `li`
+ `l`
### Arguments
| Argument            | Shorthand | Type | Description |
|:------------------- |:--------- |:---- |:----------- |
| paths             | -p        | Array | List saved search paths. |
| ignoreKeywords    | -i | Array | List saved ignore keywords. |
| excludePaths | -e | Array | List saved exclude paths |
### Examples
```PowerShell

# List all paths, keywords, and excluded paths
murdermod li

# List all paths
murdermod list -p

# List all ignore keywords
murdermod l --ignoreKeywords

# List all paths and ignore keywords
murdermod li -p -i

```

---

## `kill`
_Removes all or selected node modules._
### Command Variations
+ `kill`
+ `k`
### Arguments
| Argument            | Shorthand | Type | Description |
|:------------------- |:--------- |:---- |:----------- |
| noPrompt             | -n        | Boolean | Ignore prompts such as confirmation prompts. This is great for automation as it requires no additional user input. |
| snipe    | -s | Boolean / String | Allows you to select a specific node module directory to kill instead of removing all found modules. You can provide a path after the argument for automation or if no path is provided, You will be asked to select 1 from all found modules. NOTE: If you are using no prompt, using snipe without a path specified will remove the first found directory. |
| verbose | -v | Boolean | Display all event logs. |
### Examples
```PowerShell

# Remove modules with confirmation showing how many were found
murdermod kill

# Remove modules without user prompts
murdermod k -n

# Select 1 module path to remove
murdermod kill --snipe

# Remove 1 specified module path
mudermod k -s C:/Users/username/Projects/MyProject/node_modules

# Display all event information while removing modules
murdermod k --verbose

```

---

