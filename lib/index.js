/**
 * @fileoverview check attr value
 * @author chenjing.serena
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

modules.exports.config = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



