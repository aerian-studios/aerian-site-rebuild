import * as React from "react";

import { storiesOf } from "@storybook/react";

import { successStory } from "../../types/fixtures";
import { SuccessStoryBlock } from "./index";

storiesOf("SuccessStoryBlock", module).add("Default", () => (
    <SuccessStoryBlock successStory={successStory} />
));
