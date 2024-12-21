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
- [Options](#options)
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

## Options

- `cliPath` **(required)**: The path to the executable file of your CLI tool. (Type: String)

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

Copyright © 2024 ioncakephper. This project is [MIT licensed](LICENSE).
