import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { successStory } from "../../types/fixtures";
import { SuccessStoryBlock } from "./index";

storiesOf("SuccessStoryBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <SuccessStoryBlock successStory={successStory} />
    ))
);
