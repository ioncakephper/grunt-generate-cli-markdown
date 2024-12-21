module.exports = function(grunt) {
    grunt.registerTask('generate-cli-markdown', 'Generates Markdown documentation for a CLI', function (cliPath = './src/index.js') {  // Default cliPath
        const cliName = path.basename(cliPath, path.extname(cliPath));
        const markdownFilePath = `${cliPath}.md`;
    
        try {
          /**
           * Generates Markdown documentation for a CLI
           * @param {string} cliPath Path to the CLI file
           * @returns {{markdownContent: string, commands: string[]}} Object containing the generated markdown content and an array of commands
           * @example
           * const markdown = generateMarkdown('./src/index.js');
           * console.log(markdown.markdownContent);
           */
          function generateMarkdown(cliPath) {
            /**
             * Gets the help output for the CLI
             * @param {string} cliPath Path to the CLI file
             * @returns {string} Help output as a string
             */
            const getHelpOutput = (cliPath) => execSync(`node ${cliPath} -h`).toString();
    
            /**
             * Gets the version output for the CLI
             * @param {string} cliPath Path to the CLI file
             * @returns {string} Version output as a string
             */
            const getVersionOutput = (cliPath) => execSync(`node ${cliPath} -V`).toString().trim();
    
            const helpOutput = getHelpOutput(cliPath);
            const versionOutput = getVersionOutput(cliPath);
    
            const lines = helpOutput.split('\n');
    
            // Extract Description (First non-empty line after the Usage line)
            const description = lines.slice(2).find(line => line.trim() !== '');
            let markdownContent = ``;
    
            if (description) {
              markdownContent += `${description}\n\n`;
            }
    
            let exampleUsage = `node ${cliPath}`;
    
            // Check for Commands and Arguments sections in help output
            const hasCommands = helpOutput.includes('Commands:');
            const hasArguments = helpOutput.includes('Arguments:');
            const hasOptions = helpOutput.includes('Options:');
    
            if (hasCommands) {
              exampleUsage += ' [command]';
            }
    
            if (hasArguments) {
              exampleUsage += ' [arguments]';  // Or [options] [arguments] if you always want options to be shown.
            }
    
            if (hasOptions) {
              exampleUsage += ' [options]';
            }
    
            markdownContent += '**Example Usage:**\n\n';
            markdownContent += `\`\`\`bash\n${exampleUsage}\n\`\`\`\n\n`;
    
            // Version Information (Refactored)
            markdownContent += '**Version:**\n\n';
            markdownContent += `\`\`\`bash\nnode ${cliPath} -V # or --version\n\`\`\`\n\n`
            markdownContent += `\`\`\`txt\n${versionOutput}\n\`\`\`\n\n`;
    
            // Help Information (Refactored)
            markdownContent += '**Help:**\n\n';
            markdownContent += `\`\`\`bash\nnode ${cliPath} -h # or --help\n\`\`\`\n\n`
            markdownContent += `\`\`\`txt\n${helpOutput}\n\`\`\`\n\n`;
    
            // Arguments
            const argumentsSectionStart = lines.findIndex(line => line.trim().startsWith('Arguments:'));
            if (argumentsSectionStart !== -1) {
              const argumentsSectionEnd = lines.findIndex((line, index) => index > argumentsSectionStart && line.trim() === '');
              const argumentLines = lines.slice(argumentsSectionStart + 1, argumentsSectionEnd).filter(line => line.trim() !== '');
    
              markdownContent += '**Arguments:**\n\n';
    
              if (argumentLines.length > 0) {
                const argumentsData = argumentLines.map(line => {
                  const match = line.match(/^\s*(\S+)\s+(.+?)(\s\(default:\s(.+)\))?$/);
                  if (match) {
                    return {
                      name: match[1].trim(),
                      description: match[2].trim(),
                      default: match[4] || '' // Extract default value or empty string if not present
                    };
                  } else {
                    return null;
                  }
                }).filter(Boolean);
    
                const hasDefaultValues = argumentsData.some(arg => arg.default !== '');
    
                const header = `| Argument | Description${hasDefaultValues ? ' | Default' : ''} |\n`;
                const separator = `|---|---|${hasDefaultValues ? '---|' : ''}`;
                const rows = argumentsData.map(arg => `| \`${arg.name}\` | ${arg.description}${hasDefaultValues ? ` | ${arg.default}` : ''} |`).join('\n');
    
                markdownContent += `${header}${separator}\n${rows}\n\n`;
              } else {
                markdownContent += 'This CLI has no arguments.\n\n';
              }
            }
    
            // Options
            const optionsSectionStart = lines.findIndex(line => line.trim().startsWith('Options:'));
            if (optionsSectionStart !== -1) {
              const optionsSectionEnd = lines.findIndex((line, index) => index > optionsSectionStart && line.trim() === '');
              const optionsLines = lines.slice(optionsSectionStart + 1, optionsSectionEnd).filter(line => line.trim() !== '');
    
              markdownContent += '**Options:**\n\n';
    
              if (optionsLines.length > 0) {
                const options = optionsLines.map(line => {
                  const match = line.match(/^\s{2}((\-[a-zA-Z]\s*,\s*)?--[^\s]+)\s+(?:<([^>]+)>|\[([^\].]*)(\.{3})?\])?\s+(.+?)(\s\(default:\s(.+)\))?$/);
    
                  if (match) {
                    return {
                      option: match[1].trim(),
                      value: (
                        (match[3] || "") + (match[4] || "")) || "",  // Correct handling of capture groups 3 and 4
                      description: (match[6] || '').trim(),
                      default: match[8] || ""
                    };
                  } else {
                    return null; // Or handle non-matching lines as needed
                  }
                }).filter(Boolean); // added filter
    
                const hasDefaultValues = options.some(opt => opt.default !== ''); // Correct check for default values
    
                const header = `| Option |${hasDefaultValues ? ' Value |' : ''} Description${hasDefaultValues ? ' | Default' : ''} |\n`;
                const separator = `|---|${hasDefaultValues ? '---- |' : ''}---|${hasDefaultValues ? '---|' : ''}`; // Corrected separator
                const rows = options.map(opt => {
                  let rowOutput = `| \`${opt.option}\` `;
                  if (hasDefaultValues) rowOutput += `|${opt.value ? ` ${opt.value} ` : ''} `;
                  rowOutput += ` | ${opt.description}${hasDefaultValues ? ` | ${opt.default}` : ''} |`;
                  return rowOutput;
                }).join('\n');
    
                markdownContent += `${header}${separator}\n${rows}\n\n`;
              } else {
                markdownContent += 'This CLI has no options.\n\n';
              }
            }
    
            // Commands
            let commands;
            const commandsSectionStart = lines.findIndex(line => line.trim().startsWith('Commands:'));
            if (commandsSectionStart !== -1) {
              const commandsSectionEnd = lines.findIndex((line, index) => index > commandsSectionStart && line.trim() === '');
              const commandLines = lines.slice(commandsSectionStart + 1, commandsSectionEnd).filter(line => line.trim() !== '');
    
              if (commandLines.length > 0) {
                commands = commandLines.map(line => {
                  const match = line.match(/^\s{2}(\S+)/);
                  return match ? match[1] : null;
                }).filter(Boolean);
              }
            }
    
            return {
              markdownContent, commands
            };
          } // End of generateMarkdown function
    
          let markdownContent = '';
          const { markdownContent: generatedMarkdown, commands } = generateMarkdown(`${cliPath}`);
          markdownContent += generatedMarkdown;
          if (commands.length > 0) {
            markdownContent += '## Commands\n\n';
    
            for (const command of commands) {
              markdownContent += `- [\`${command}\` command](#${command}-command)\n`;
            }
    
            markdownContent += '\n';
            for (const command of commands) {
              const commandName = command.split('|')[0].trim();
              const { markdownContent: generatedMarkdown } = generateMarkdown(`${cliPath} ${commandName}`);
              markdownContent += `### \`${command}\` command\n\n`;
              markdownContent += generatedMarkdown;
            }
          }
    
          fs.writeFileSync(markdownFilePath, markdownContent);
          grunt.log.ok(`Markdown documentation generated: ${markdownFilePath}`);
        } catch (error) {
          grunt.log.error(`Error generating Markdown: ${error.message}`);
        }
      });
};
