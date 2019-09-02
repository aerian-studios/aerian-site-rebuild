/* eslint-disable */
const babelOptions = {
    presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
    plugins: [
        "require-context-hook"
    ]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
