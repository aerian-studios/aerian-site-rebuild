import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import "../src/lib/theme";
global.___loader = {
    enqueue: () => {}
};
global.__PATH_PREFIX__ = "";

addDecorator(withInfo({ inline: true }));

const req = require.context("../src/components", true, /\.story\.[tj]sx?$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
