import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const iter = (tree, path = '') => {
  const lines = tree
    .flatMap((node) => {
      const property = path ? `${path}.${node.key}` : node.key

      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.value)}`
        case 'removed':
          return `Property '${property}' was removed`
        case 'updated':
          return `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        case 'nested':
          return iter(node.children, property)
        default:
          return []
      }
    })

  return lines.join('\n')
}

export default iter
