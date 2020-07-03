function cmd() {}

function is_installed(command) {
    try {
        require('which').sync(command)
        return true
    } catch (e) {
        return false
    }
}
cmd.prototype.is_installed = is_installed

cmd.prototype.is_parallel_installed = function () {
    return is_installed('parallel')
}

module.exports = new cmd()
