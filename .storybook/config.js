import { configure } from "@storybook/react";

const req = require.context("../src/components", true, /\.story\.[tj]sx?$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
