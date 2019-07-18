import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { Gallery } from "./index";

storiesOf("Gallery", module).add("Default", () => (
    <Gallery gallery={project.gallery} className="myClass" />
));
