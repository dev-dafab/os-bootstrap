#!/usr/bin/env node


let options = {};

options['argv'] = process.argv;

require('./src/parser')({
  options : options
});
