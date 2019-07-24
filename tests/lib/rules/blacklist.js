const rule = require('../../../lib/rules/blacklist');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})

ruleTester.run('blacklist', rule, {
  valid: [
    {
      code: ' var a = "abc";',
      options: [{
        patterns: [/d/, /e/]
      }]
    },
    {
      code: ' var a = "abc"; ',
      options: [{
        patterns: [/a/],
        ignoreValues: ['abc']
      }]
    },
    {
      code: ' // eslint-disable string-value/blacklist var a = "abc"; ',
      options: [{
        patterns: [/a/],
      }]
    }
  ],

  invalid: [
    {
      code: ' var a = "abc"; ',
      options: [{
        patterns: [/a/]
      }],
      errors: [{
        message: '\'abc\' is in blacklist.',
        rule: 'blacklist'
      }]
    },
    {
      code: ' var arr = ["abc"]; ',
      options: [{
        patterns: [ /a/]
      }],
      errors: [{
        message: '\'abc\' is in blacklist.',
        rule: 'blacklist'
      }]
    },
    {
      code: ' var obj = { str: "abc" };',
      options: [{
        patterns: [/a/],
      }],
      errors: [{
        message: '\'abc\' is in blacklist.',
        rule: 'blacklist'
      }]
    },
    {
      code: ' function fn() { return "abc" }',
      options: [{
        patterns: [/a/],
      }],
      errors: [{
        message: '\'abc\' is in blacklist.',
        rule: 'blacklist'
      }]
    },
  ]
})