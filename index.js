#!/usr/bin/env node

const os = require("./src/os");

const cmd_line_parser = require("./src/parser")({
  argv: process.argv,
  os: os
});
