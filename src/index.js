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
