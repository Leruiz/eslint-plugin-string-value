module.exports = {
  meta: {
      type: 'problem',

      docs: {
          description: 'disallow some const string values for given attributes',
          category: 'Possible Errors',
          recommended: true,
      },
      schema: [
        {
            type: 'object',
            properties: {
                /**
                 * tag name
                 */
                tagName: {
                  type: 'string',
                  
                },
                /**
                 * property names
                 */
                attributeName: {
                  type: 'string',
                  
                },
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
    const { regexpPatterns = [], ignoreValues = [], tageName = '',  attributeName = ''} = options || [];

    if (!regexpPatterns) return true;

    return context.parserServices.defineTemplateBodyVisitor({
      'Identifier'(node) {

          console.log('........', node)

        if (typeof value !== 'string') return;

        if (ignoreValues.includes(value)) return;
        
        const notMatched = regexpPatterns.reduce(
          (acc, curPattern) => !curPattern.test(value) && acc,
          true,
          );
        
        if (!notMatched) {
          context.report({
            loc: node.loc.start,
            message: "'{{value}}' is in blacklist.",
            data: { value }
          })
        }
      }
    })
  }
};