module.exports = (str, data) => {
    if (!str.includes('$')) {
        return str
    }

    if (str.includes('$installation_command')) {
        return str.replace(
            '$installation_command',
            data['core']['installation_command']
        )
    }

    if (str.includes('eq') && str.includes('$if')) {
        const str_parts = str.split(' ').shift().split('_')
        return data['core'][str_parts[1]] === str_parts.pop()
            ? `${str.split(str.split(' ').shift()).pop()}`.trim()
            : ''
    }

    return str
}
