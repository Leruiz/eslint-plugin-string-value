const { checkBlacklist } = require('../utils');

function filterNodes(node, blacklist) {
  // filter element by tagName
  const targetList = blacklist.filter(
    // *: all
    (item) => [node.name, '*'].includes(item.tagName),
  );
  
  const { attributes } = node.startTag;

  return attributes.filter(({ value }) => value.type === 'VLiteral')
    .map(({ key, value }) => {
      const singlePattern = targetList.find(
        ({ attributeName }) => ['*', key.name].includes(attributeName),
      );
      const { patterns = [], ignoreValues = [] } = singlePattern || {};

      return {
        node: value,
        options: { patterns, ignoreValues }
      }
    })
}

module.exports = {
  meta: {
      type: 'problem',
      docs: {
          description: 'disallow some const string values for given tags and attributes',
          category: 'Possible Errors',
          recommended: true,
      },
      schema: [
        {
            type: 'object',
            properties: {
              /**
               * blacklist, an array of object, which has the highest priority
               * {
               *  tagName: string,
               *  attributeName: string,
               *  patterns: array,
               *  ignoreValues: array
               * }
               */
              blacklist: {
                type: 'array',
              },
            },
            'additionalProperties': false
        }
    ]
  },
  create: function(context) {
    /**
     * check options: blacklist
     */
    const { blacklist } = context.options[0] || {};

    const list = (blacklist || []).filter((item) => {
      const { patterns } = item;
      return Array.isArray(patterns) && patterns.length;
    });

    function elementHandler(node) {
      const checkedPairs = filterNodes(node, list);

      for (let idx in checkedPairs) {
        const { node, options = {} } = checkedPairs[idx];
        const { patterns, ignoreValues } = options;
        const notMatched = checkBlacklist(node, patterns, ignoreValues);
        if (!notMatched) {
          const { value, loc } = node;
          context.report({
            loc: loc.start,
            message: "'{{value}}' is in blacklist.",
            data: { value }
          });
          break;
        }
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      ['VElement']: elementHandler
    });
  }
};