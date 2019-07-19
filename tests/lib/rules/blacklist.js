const rule = require('../../../lib/rules/blacklist');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})

ruleTester.run('string-value-blacklist', rule, {
  valid: [
    {
      code: ' var a = "abc";',
      options: [{
        regexpPatterns: [/d/, /e/]
      }]
    },
    {
      code: ' var a = "abc"; ',
      options: [{
        regexpPatterns: [/a/],
        ignoreValues: ['abc']
      }]
    }
  ],

  invalid: [
    {
      code: ' var a = "abc"; ',
      options: [{
        regexpPatterns: [/a/]
      }],
      errors: [{
        message: 'error',
        rule: 'string-value-blacklist'
      }]
    },
    {
      code: ' var arr = ["abc"]; ',
      options: [{
        regexpPatterns: [ /a/]
      }],
      errors: [{
        message: 'error',
        rule: 'string-value-blacklist'
      }]
    },
    {
      code: ' var obj = { str: "abc" };',
      options: [{
        regexpPatterns: [/a/],
      }]
    },
    {
      code: ' function () { return "abc" }',
      options: [{
        regexpPatterns: [/a/],
      }]
    },
  ]
})