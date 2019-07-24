const { checkBlacklist } = require('../utils');

module.exports = {
  meta: {
      type: 'problem',

      docs: {
          description: 'disallow some const string values',
          category: 'Possible Errors',
          recommended: true,
      },
      schema: [
        {
            type: 'object',
            properties: {
                /** 
                 * value patterns in black list
                */
                patterns: {
                    type: 'array',
                },

                /**
                 * values to be ignored
                 */
                ignoreValues: {
                  type: 'array',
                },
            },
            'additionalProperties': false
        }
    ]
  },
  create: function(context) {
    const options = context.options[0] || {};
    const { patterns = [], ignoreValues = [] } = options || [];

    if (!patterns) return true;

      return {
          Literal(node) {
            const notMatched = checkBlacklist(node, patterns, ignoreValues);
            const { value } = node;
            
            if (!notMatched) {
              return context.report({
                loc: node.loc.start,
                message: "'{{value}}' is in blacklist.",
                data: { value }
              })
            }
          }
      };
  }
};