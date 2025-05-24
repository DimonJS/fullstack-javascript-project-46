import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatterMap = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (diff, formatName = 'stylish') => {
  if (!formatterMap[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatterMap[formatName](diff);
};
