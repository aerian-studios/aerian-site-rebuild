import * as React from "react";


import { storiesOf } from "@storybook/react";
import { SectionNav } from "./SectionNav";

import sharedStyles from "../Layout.module.scss";

const keys = {
    caseStudy: "Introduction",
    gallery: "Gallery",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "The Result"
};

storiesOf("SectionNav", module)
    .add(
        "Default",
        (() => (
            <SectionNav
                keyConsts={keys}
                onNavigation={itemKey => console.log(`clicked ${itemKey}`)}
                className="myClass"
            />
        ))
    )
    .add(
        "With contextual styles",
        (() => (
            <SectionNav
                keyConsts={keys}
                onNavigation={itemKey => console.log(`clicked ${itemKey}`)}
                className={sharedStyles.sectionNav}
                navItemClassName={sharedStyles.sectionNavItem}
                navWrapperClassName={sharedStyles.sectionNavWrapper}
            />
        ))
    );
