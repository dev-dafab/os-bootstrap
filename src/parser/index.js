
module.exports = function (options) {
  options['program']= require('./argv_parser')(options);
  module.exports = require('./config_file_parser')(options);
}
