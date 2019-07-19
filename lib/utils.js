module.exports = {
  checkBlacklist(literalNode, patterns, ignoreValues = []) {
    const value = literalNode.value;

    if (typeof value !== 'string') return true;

    if (ignoreValues.includes(value)) return true;
    
    return patterns.reduce(
      (acc, curPattern) => !curPattern.test(value) && acc,
      true,
      );
  },
}