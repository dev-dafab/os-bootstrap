// A; B    # Run A and then B, regardless of success of A
// A && B  # Run B if and only if A succeeded
// A || B  # Run B if and only if A failed
// A &     # Run A in background.

const bash_writer = require('./bash-writer')
const { CONST } = require('../constants')
const { isConfigEntryEmpty, filter_output } = require('./helper')

function run(data) {
    const configs = [
        { intro: () => process_before_scripts },
        { before_all: require('./before-all') },
        { dependencies: require('./packages') },
        { dotfiles: require('./dotfiles') },
    ]

    configs
        .filter((e) => {
            return data[Object.entries(e).pop().shift()] !== undefined
        })
        .map((value) => Object.entries(e).pop().pop()(data))
        .map(bash_writer)
}

module.exports = function (data) {
    run(data)
    /*
bash_writer.set(CONST.BASH_INTRO_STR)
   const before_script = process_before_scripts(data)
   bash_writer.set(before_script)
   const packages = process_packages(data)
   bash_writer.set(packages)
   const dotfiles = process_dotfiles(data)
   bash_writer.set(dotfiles)
   bash_writer.set(
       CONST.BASH_RUN_ALL_INSTALLATIONS(
           typeof before_script !== 'undefined',
           typeof packages !== 'undefined',
           typeof dotfiles !== 'undefined'
       )
   )

   bash_writer.set('EOF')
*/
}
