const path = require("path");
module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.scss$/,
        loaders: [
            "style-loader",
            {
                loader: "typings-for-css-modules-loader",
                options: {
                    module: true,
                    camelCase: true,
                    banner:
                        "// This file is automatically generated from your CSS. Any edits will be overwritten.",
                    namedExport: true,
                    silent: true
                }
            },
            "sass-loader"
        ],
        include: path.resolve(__dirname, "../")
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
