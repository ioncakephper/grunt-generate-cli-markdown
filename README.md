<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">grunt-generate-cli-markdown</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ioncakephper/grunt-generate-cli-markdown.svg)](https://github.com/ioncakephper/grunt-generate-cli-markdown/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ioncakephper/grunt-generate-cli-markdown.svg)](https://github.com/ioncakephper/grunt-generate-cli-markdown/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![Node.js CI](https://github.com/ioncakephper/grunt-generate-cli-markdown/actions/workflows/node.js.yml/badge.svg)](https://github.com/ioncakephper/grunt-generate-cli-markdown/actions/workflows/node.js.yml)

</div>

---

<p align="center"> Generates Markdown documentation for a CLI.  This Grunt plugin helps automate the creation of markdown documentation based on how your CLI tool.
    <br>
</p>

## 📝 Table of Contents <!-- omit in toc -->

- [🏁 Getting Started](#-getting-started)
- [🎈 Usage](#-usage)
- [:gear: Options](#gear-options)
- [:exclamation: Example](#exclamation-example)
- [Commands](#commands)
  - [`check|c` command](#checkc-command)
  - [`build|b` command](#buildb-command)
  - [`help` command](#help-command)
- [⛏️ Built Using](#️-built-using)
- [🤝 Contributing](#-contributing)
- [💖 Show your support](#-show-your-support)
- [✍️ Authors](#️-authors)
- [📝 License](#-license)

## 🏁 Getting Started

This plugin requires Grunt `^1.6.1`

1. **Install the plugin:**

```bash
npm install grunt-generate-cli-markdown --save-dev
```

2. **Load the plugin:** Add this line to your Gruntfile.js file:

```js
grunt.loadNpmTasks('grunt-generate-cli-markdown');
```

3. **Configure the plugin:** Add the following configuration to your Gruntfile.js file:

```js
  generate-cli-markdown: {
    your_target: { // Arbitrary target name
      options: {
        // Add plugin-specific options here. Examples:
        cliPath: 'path/to/your/cli', // Path to your CLI executable
        // other options as needed.
      },
      files: {
        'DESTINATION_README.md': 'SOURCE.md'  // Specify source and destination files
      }
    },
  },
```

## 🎈 Usage

```js
generate-cli-markdown: {
  myTarget: { 
   options: {
     cliPath: './bin/mycli',
       // ... other options
   },
   files: {
     'docs/README.md': 'templates/README.md'
   }
 }
}
```

## :gear: Options

- `cliPath` **(required)**: The path to the executable file of your CLI tool. (Type: String)

## :exclamation: Example

This example demonstrates how to use `grunt-generate-cli-markdown` with a simple CLI that has two commands (`check` and `build`) and a global verbose option.  It also showcases the use of command aliases and customizing the help output.

**1. Create the CLI:**

Create a file named `src/index.js` (or any name you like, making sure to update the paths in the configuration accordingly) with the following content:

```javascript
#!/usr/bin/env node

"use strict";
const { program } = require('commander');

program
    .version('1.0.0')
    .option('-v, --verbose', 'Enable verbose output')
    .configureHelp({
        sortCommands: true,
        sortOptions: true,
        showGlobalOptions: true
    });


program
    .command('check')
    .alias('c')
    .description('Check the project')
    .action(() => {
        console.log('Checking the project...');
    });

program
    .command('build')
    .alias('b')
    .description('Build the project')
    .option('-p, --production', 'Build for production')
    .option('-s, --sidebarsFilename <filename>', 'Specify the sidebars filename', 'sidebars.js')
    .option('-d, docs <docs>', 'Specify the docs directory', 'docs')
    .option('--config <filename>', 'Specify the config file', 'app.config.js')
    .argument('<source>', 'Source directory')
    .argument('[destination]', 'Destination directory', 'dist')
    .action((source, destination, options) => {
        console.log('Building the project...');
        console.log('Source:', source);
        console.log('Destination:', destination);
        console.log('Options:', options);
    });

program.parse();
```

**2. Create a Gruntfile.js:**

Create a file named `Gruntfile.js` with the following content:

  ```javascript
  module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-generate-cli-markdown');
  
  };
```

**3. Install dependencies:**

- Install the `commander` package:

```bash shell
npm install commander
```

- Install the `grunt-generate-cli-markdown` and `grunt` packages:

```bash shell
npm install grunt-generate-cli-markdown --save-dev
```

**4. Install the Grunt-CLI package:**

```bash shell
npm install -g grunt-cli
```

**5. Run the Grunt task:** 

```bash shell
grunt generate-cli-markdown
```

```bash shell
Running "generate-cli-markdown" task
>> Markdown documentation generated: ./src/index.js.md

Done.
```

This will generate a markdown file (`src/index.js.md` in this example) containing the documentation for your CLI, including the commands, their descriptions, aliases, and the global verbose option. The generated markdown will also reflect the custom help configuration using `sortCommands`, `sortOptions`, and `showGlobalOptions`.

By modifying the `src/index.js` file (adding, removing, or changing commands, options, descriptions, etc.), and re-running the grunt `generate-cli-markdown` task, the generated markdown documentation will automatically update to reflect the changes in your CLI's source code. For instance, adding a new command with its description and options in `src/index.js` will result in this new command's documentation appearing in the generated markdown after running the Grunt task.

**6. Examine the generated markdown:**

```markdown
<!-- ::insert file="src/index.js.md" -->
<!-- Inserted on: 2024-12-24T09:46:39.041Z -->
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


<!-- :/insert -->

```

**7. Change CLI source file:**

Update the CLI source file to include more commands, options, and aliases. Rerun the Grunt task to generate the updated markdown.

```javascript
program
  .command('check')
  .alias('c')
  .description('Check the project')
  .action(() => {
    console.log('Checking the project...');
  });

program
  .command('build', { hidden: false })
  .alias('b')
  .description('Build the project')
  .action(() => {
    console.log('Building the project...');
  });

program
  .command('deploy', { hidden: false })
  .alias('d')
  .description('Deploy the project')
  .action(() => {
    console.log('Deploying the project...');
  });

program.parse();
```

```bash shell
grunt generate-cli-markdown
```


## ⛏️ Built Using

- Node.js
- Grunt

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 💖 Show your support

Give a ⭐️ if this project helped you!

## ✍️ Authors

- [@ioncakephper](https://github.com/ioncakephper) - Idea & Initial work

## 📝 License

Copyright © 2024 [Ion Gireada](https://github.com/ioncakephper). This project is [MIT licensed](LICENSE).


