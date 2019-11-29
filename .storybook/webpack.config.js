const path = require("path");
module.exports = ({ config }) => {
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];

    // setup to us typings for css modules
    config.module.rules.push({
        test: /\.scss$/,
        loaders: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    camelCase: true,
                    namedExport: true,
                    silent: true,
                    importLoaders: 2,
                    localIdentName: "[path][name]__[local]--[hash:base64:5]"
                }
            },
            "sass-loader"
        ],
        include: path.resolve(__dirname, "../")
    });
    
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader");
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
        require.resolve("@babel/preset-react"),
        require.resolve("@babel/preset-env")
    ];
    config.module.rules[0].use[0].options.plugins = [
        // use @babel/plugin-proposal-class-properties for class arrow functions
        require.resolve("@babel/plugin-proposal-class-properties"),
        // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
        // require.resolve("babel-plugin-remove-graphql-queries")
    ];
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];
    config.resolve.alias['gatsby'] = path.resolve(__dirname, "../src/lib/gatsbyShim.ts");
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
            presets: ["@babel/react", "@babel/env", "@babel/typescript"],
            plugins: [
                require.resolve("@babel/plugin-proposal-class-properties"),
                // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
                // require.resolve("babel-plugin-remove-graphql-queries")
            ]
        }
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
};
