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
                regexpPatterns: {
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
    const { regexpPatterns = [], ignoreValues = [] } = options || [];

    if (!regexpPatterns) return true;

      return {
          Literal(node) {
            const notMatched = checkBlacklist(node, regexpPatterns, ignoreValues);
            
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