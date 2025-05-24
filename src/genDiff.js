import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js'

const getFullPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const getData = (filepath) => parse(readFileSync(getFullPath(filepath), 'utf-8'), path.extname(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);

  const diff = buildDiff(obj1, obj2);
  return getFormatter(diff, format);
};

export default genDiff;
