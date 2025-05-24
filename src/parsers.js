import yaml from 'js-yaml';
// import path from 'path';

const parse = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
};

export default parse;