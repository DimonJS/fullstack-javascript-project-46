#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/genDiff.js'

const program = new Command()

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format)
    console.log(diff)
  })

program.parse()
