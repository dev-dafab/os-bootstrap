const fs = require('fs')
const foo = fs.readFileSync('./files/bash.config.minimal.bash', 'utf-8')
console.log(foo)
