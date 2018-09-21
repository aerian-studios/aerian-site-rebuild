import * as React from "react";

import { storiesOf } from "@storybook/react";
import { whatWeDo } from "../../types/fixtures";
import { WhatWeDoPage } from "./index";

storiesOf("WhatWeDoPage", module).add("Default", () => (
    <WhatWeDoPage page={whatWeDo} />
));
