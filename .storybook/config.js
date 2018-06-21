import { configure } from "@storybook/react";
import "../src/scss/base-theme.scss";
const req = require.context("../src/components", true, /\.story\.[tj]sx?$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
