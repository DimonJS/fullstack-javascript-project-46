#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff.js';
import { parse, getFormat } from '../src/parsers.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filename1> <filename2>')
  .action((filename1, filename2) => {
    // Подставляем путь до __fixtures__
    const fixturesDir = path.resolve('__fixtures__');

    const filepath1 = path.join(fixturesDir, filename1);
    const filepath2 = path.join(fixturesDir, filename2);

    const data1 = fs.readFileSync(filepath1, 'utf-8');
    const data2 = fs.readFileSync(filepath2, 'utf-8');

    const format1 = getFormat(filepath1);
    const format2 = getFormat(filepath2);

    const parsed1 = parse(data1, format1);
    const parsed2 = parse(data2, format2);

    const diff = genDiff(parsed1, parsed2);
    console.log(diff);
  });

program.parse(process.argv);
