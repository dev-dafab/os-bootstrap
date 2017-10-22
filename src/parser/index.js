

function parser(options) {
    let argv;

    if (!options.argv) {
        throw new Error('Arguments are required');
    }

    return {
      start: function () {
        console.log('start programm');
      }
    };

}


module.exports = parser;
