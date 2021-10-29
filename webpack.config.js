const path = require('path');

const name = 'AuthSign'; //插件名称

module.exports = {
    entry: [
        `./src/${name}.js`
    ],
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, 'build', `com.nehza.PawExtensions.${name}`) //插件标识符
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['safari >= 7']
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    }
};