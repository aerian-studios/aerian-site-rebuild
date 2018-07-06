import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { pageSection } from "../../types/fixtures";
import { PageSectionBlock } from "./index";

storiesOf("PageSectionBlock", module)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <PageSectionBlock section={pageSection} />
        ))
    )
    .add(
        "Alternate",
        withInfo({ inline: true })(() => (
            <PageSectionBlock section={pageSection} alternate={true} />
        ))
    );
