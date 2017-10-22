const program = require('commander');

function parse(argv) {
 program
  .version('0.0.1')
  .command('osboot <arg>');

  program
  .option('-d, --dotfiles-dir <path>', 'dotfiles directories')
  .option('-c, --config-file  <path>', 'config file')
  .parse(argv);
  return program;
}


function parser(options) {
  let argv = options.argv;

  if (typeof options.argv === 'undefined' || options.argv === null) {
      throw new Error('Arguments are required');
  }

  return  parse(argv);
}


module.exports = parser;
