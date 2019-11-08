import * as React from "react";

import { storiesOf } from "@storybook/react";

import { SimpleHoverCard } from "./index";
import { projectBox } from "../../types/fixtures";

storiesOf("SimpleHoverCard", module).add("Default", () => (
    <SimpleHoverCard className="myClass" project={projectBox} />
));
