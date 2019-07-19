const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/attributes-value-blacklist');

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

tester.run('attributes-value-blacklist', rule, {
  valid: [
    {
      code: '<template><img :src="url"/></template> <script> export default { data() {return { url: "http://"}}}</script>',
      options: [{
        tagName: 'img',
        attributeName: 'src',
        regexpPatterns: [/e/]
      }]
    },
  ],
  invalid: [
    
  ]
})
