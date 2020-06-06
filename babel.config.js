module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: '14',
                },
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
}
