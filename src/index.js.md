Options:

**Example Usage:**

```bash
node ./src/index.js [command] [options]
```

**Version:**

```bash
node ./src/index.js -V # or --version
```

```txt
1.0.0
```

**Help:**

```bash
node ./src/index.js -h # or --help
```

```txt
Usage: index [options] [command]

Options:
  -h, --help                                display help for command
  -v, --verbose                             Enable verbose output
  -V, --version                             output the version number

Commands:
  check|c                                   Check the project
  build|b [options] <source> [destination]  Build the project
  help [command]                            display help for command

```

**Options:**

| Option | Description |
|---|---|
| `-h, --help`  | display help for command |
| `-v, --verbose`  | Enable verbose output |
| `-V, --version`  | output the version number |

## Commands

- [`check|c` command](#check|c-command)
- [`build|b` command](#build|b-command)
- [`help` command](#help-command)

### `check|c` command

Check the project

**Example Usage:**

```bash
node ./src/index.js check [options]
```

**Version:**

```bash
node ./src/index.js check -V # or --version
```

```txt
1.0.0
```

**Help:**

```bash
node ./src/index.js check -h # or --help
```

```txt
Usage: index check|c [options]

Check the project

Options:
  -h, --help     display help for command

Global Options:
  -v, --verbose  Enable verbose output
  -V, --version  output the version number

```

**Options:**

| Option | Description |
|---|---|
| `-h, --help`  | display help for command |

### `build|b` command

Build the project

**Example Usage:**

```bash
node ./src/index.js build [arguments] [options]
```

**Version:**

```bash
node ./src/index.js build -V # or --version
```

```txt
1.0.0
```

**Help:**

```bash
node ./src/index.js build -h # or --help
```

```txt
Usage: index build|b [options] <source> [destination]

Build the project

Arguments:
  source                             Source directory
  destination                        Destination directory (default: "dist")

Options:
  --config <filename>                Specify the config file (default:
                                     "app.config.js")
  -d, docs <docs>                    Specify the docs directory (default:
                                     "docs")
  -h, --help                         display help for command
  -p, --production                   Build for production
  -s, --sidebarsFilename <filename>  Specify the sidebars filename (default:
                                     "sidebars.js")

Global Options:
  -v, --verbose                      Enable verbose output
  -V, --version                      output the version number

```

**Arguments:**

| Argument | Description | Default |
|---|---|---|
| `source` | Source directory |  |
| `destination` | Destination directory | "dist" |

**Options:**

| Option | Description |
|---|---|
| `--config`  | Specify the config file (default: |
| `-h, --help`  | display help for command |
| `-p, --production`  | Build for production |
| `-s, --sidebarsFilename`  | Specify the sidebars filename (default: |

### `help` command

Options:

**Example Usage:**

```bash
node ./src/index.js help [command] [options]
```

**Version:**

```bash
node ./src/index.js help -V # or --version
```

```txt
1.0.0
```

**Help:**

```bash
node ./src/index.js help -h # or --help
```

```txt
Usage: index [options] [command]

Options:
  -h, --help                                display help for command
  -v, --verbose                             Enable verbose output
  -V, --version                             output the version number

Commands:
  check|c                                   Check the project
  build|b [options] <source> [destination]  Build the project
  help [command]                            display help for command

```

**Options:**

| Option | Description |
|---|---|
| `-h, --help`  | display help for command |
| `-v, --verbose`  | Enable verbose output |
| `-V, --version`  | output the version number |

