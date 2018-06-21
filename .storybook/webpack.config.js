const path = require("path");
module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.s?css$/,
        loaders: [
            require.resolve("style-loader"),
            {
                loader: require.resolve("css-loader"),
                options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: "[name]__[local]___[hash:base64:5]"
                }
            }
        ]
    });
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve("ts-loader"),
                options: {
                    transpileOnly: true
                }
            },
            require.resolve("react-docgen-typescript-loader")
        ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};
