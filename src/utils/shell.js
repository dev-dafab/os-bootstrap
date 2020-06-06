const shell = require('shelljs')

/**
 * mkdir.
 * @param {*} options
 * @param {*} dir_array
 * @param {*} cb
 */
const mkdir = function mkdir(options, dir_array, cb) {
    const ret = shell.mkdir(options, dir_array)
    if (cb) {
        cb(ret.stdout, ret.stderr)
    }
    return { output: ret.stdout, error: ret.stderr }
}

/**
 * ln_file.
 * @param {string} path_to_file - muss be an absolut path.
 * @param {string} destination - destination directory.
 * @param {string} destination_file_name - destination file name. if ignore. the destination.
 * @return {number} code - status code.
 */
const ln_file = function ln_file(
    path_to_file,
    destination,
    destination_file_name
) {
    let destination_file_name

    if (!destination_file_name) {
        const original_file_parts = path_to_file.split()
        destination_file_name = original_file_parts.split('/')[
            original_file_parts.length - 1
        ]
    }
    return shell.ln(path_to_file, destination + '/' + destination_file_name)
        .code
}

/**
 *
 * @param {string} command_str
 */
const exec_silent = function exec_silent(command_str) {
    var child = exec(command_str, { silent: true })
}
