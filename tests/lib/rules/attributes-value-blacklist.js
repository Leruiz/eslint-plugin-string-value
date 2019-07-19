const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/attributes-value-blacklist');

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

tester.run('attributes-value-blacklist', rule, {
  valid: [
    {
      code: '<template><img :src="url"/><img alt="http://123e123.com"/></template> <script> export default { data() {return { url: "http://"}}}</script>',
      options: [
        {
          blacklist: [
            {
              tagName: 'img',
              attributeName: 'src',
              patterns: [/e/]
            },
            {
              tagName: 'p',
              attributeName: 'src',
              patterns: [/e/]
            },
          ]
        }
      ]
    },
  ],
  invalid: [
    
  ]
})
