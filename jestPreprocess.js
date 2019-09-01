/* eslint-disable */
const babelOptions = {
    presets: ["@babel/react", "@babel/env", "@babel/preset-typescript"],
    plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "babel-plugin-remove-graphql-queries",
        "@babel/plugin-transform-runtime",
        "require-context-hook"
    ]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
