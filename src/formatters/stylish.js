const getIndent = (depth, replacer = ' ', spacesCount = 4) =>
  replacer.repeat(depth * spacesCount - 2)
const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) =>
  replacer.repeat((depth - 1) * spacesCount)

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const entries = Object.entries(value)
  const lines = entries.map(([key, val]) =>
    `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`,
  )
  return `{\n${lines.join('\n')}\n${getBracketIndent(depth + 1)}}`
}

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node

    switch (type) {
      case 'nested':
        return `${getIndent(depth)}  ${key}: ${formatStylish(children, depth + 1)}`
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`
      case 'removed':
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`
      case 'updated':
        return [
          `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth)}`,
          `${getIndent(depth)}+ ${key}: ${stringify(newValue, depth)}`,
        ].join('\n')
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`
};

export default formatStylish
