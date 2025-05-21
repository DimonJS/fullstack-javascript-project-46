import fs from 'fs';
import path from 'path';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const ext = path.extname(fullPath);

  const rawData = fs.readFileSync(fullPath, 'utf-8');

  switch (ext) {
    case '.json':
      return JSON.parse(rawData);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default getData;
