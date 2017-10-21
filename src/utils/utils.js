/**
 *
 */

function Utils() {
}

Utils.prototype.run_cmd = function(cmd, cb) {
  exec(cmd, (err, out, outErr)=>{
    if (cb) {
      cb(err, out);
    } else  {
      if(!err) {
        // should emit some where
      }
    }
  });
}

module.exports = Utils;

