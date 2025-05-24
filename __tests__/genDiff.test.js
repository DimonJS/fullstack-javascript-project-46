import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/genDiff.js'
// import getData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('gendiff flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8')

  expect(genDiff(filepath1, filepath2).trim()).toEqual(expected.trim())
})
