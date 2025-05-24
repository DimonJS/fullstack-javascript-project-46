import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: val1 };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: val2 };
    }

    if (_.isObject(val1) && _.isObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    if (!_.isEqual(val1, val2)) {
      return { key, type: 'updated', oldValue: val1, newValue: val2 };
    }

    return { key, type: 'unchanged', value: val1 };
  });
};

export default buildDiff;
