#!/usr/bin/env node

import { Command } from 'commander';
import getData from '../src/parsers.js';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>', 'first configuration file')
    .argument('<filepath2>', 'second configuration file')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const data1 = getData(filepath1);
      const data2 = getData(filepath2);
      console.log('Parsed file 1:', data1);
      console.log('Parsed file 2:', data2);
    });

program.parse(process.argv);
