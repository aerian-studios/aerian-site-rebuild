import * as React from "react";

import { storiesOf } from "@storybook/react";
import { about, client } from "../../types/fixtures";
import { AboutPage } from "./index";

storiesOf("AboutPage", module).add("Default", () => (
    <AboutPage page={about} clients={[client]} />
));
