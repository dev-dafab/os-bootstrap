const { CONST } = require('../constants')
const osb_eval = require('./osb-eval')
const { isConfigEntryEmpty, filter_output } = require('./helper')

module.exports = function (data) {
    if (isConfigEntryEmpty(data, 'before_all')) {
        return undefined
    }
    const before_all_scripts = data['before_all']
        .map((e) => {
            return osb_eval(e, data)
        })
        .filter(filter_output)
    return CONST.BASH_BEFORE_ALL(before_all_scripts)
}
