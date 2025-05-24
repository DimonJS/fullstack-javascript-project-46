import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../src/genDiff.js'

const getFixturePath = filename => path.join('__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff json format', () => {
  const expected = readFile('expected_json_output.json') // заранее сформированный файл
  const result = genDiff('file1.json', 'file2.json', 'json')
  expect(result).toEqual(expected.trim())
})
