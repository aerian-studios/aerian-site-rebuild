import * as React from "react";


import { storiesOf } from "@storybook/react";

import { pageSection } from "../../types/fixtures";
import { PageSectionBlock } from "./index";

storiesOf("PageSectionBlock", module)
    .add(
        "Default",
        (() => (
            <PageSectionBlock section={pageSection} />
        ))
    )
    .add(
        "Alternate",
        (() => (
            <PageSectionBlock section={pageSection} alternate={true} />
        ))
    );
