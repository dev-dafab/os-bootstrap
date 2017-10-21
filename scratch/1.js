require('./2')
const bar = function() {
  console.log(1);
  return "1";
}

module.exports = {
  bar: bar()
}
