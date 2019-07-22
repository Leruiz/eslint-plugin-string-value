const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/attribute-value-blacklist');

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

tester.run('attribute-value-blacklist', rule, {
  valid: [
    {
      code: '<template><img :src="url"/><img src="http://a.com/ex.png"/></template>',
      options: [
        {
          blacklist: [
            {
              tagName: 'img',
              attributeName: 'src',
              patterns: [/ab.com/]
            },
          ]
        }
      ]
    },
    {
      code: '<template><img alt="http://a.com/ex.png"/></template>',
      options: [
        {
          blacklist: [
            {
              tagName: 'img',
              attributeName: 'src',
              patterns: [/a.com/],
              ignoredValues: ['http://a.com/ex.png']
            },
          ]
        }
      ]
    },
  ],
  invalid: [
    {
      code: '<template><img src="http://a.com/ex.png"/></template>',
      options: [
        {
          blacklist: [
            {
              tagName: 'img',
              attributeName: 'src',
              patterns: [/a.com/]
            },
          ]
        }
      ],
      errors: [{
        message: '\'http://a.com/ex.png\' is in blacklist.',
        rule: 'attribute-value-blacklist'
      }]
    },
    {
      code: '<template><img src="http://a.com/ex.png"/><p alt="http://a.com/text.txt"></template>',
      options: [
        {
          blacklist: [
            {
              tagName: '*',
              attributeName: '*',
              patterns: [/a.com/]
            },
          ]
        }
      ],
      errors: [{
        message: '\'http://a.com/ex.png\' is in blacklist.',
        rule: 'attribute-value-blacklist'
      },{
        message: '\'http://a.com/text.txt\' is in blacklist.',
        rule: 'attribute-value-blacklist'
      }]
    },
  ]
})
