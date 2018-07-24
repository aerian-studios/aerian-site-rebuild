const babelOptions = {
    presets: ["@babel/react", "@babel/env"],
    plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "require-context-hook"
    ]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
