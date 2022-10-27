const presets = [
    [
        '@babel/preset-env',
        {
            targets: { electron: 20 }
        }
    ],
    ['@babel/preset-react']
];

module.exports = { presets };