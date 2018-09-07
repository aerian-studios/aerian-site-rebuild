import * as React from "react";


import { storiesOf } from "@storybook/react";
import { project } from "../../types/fixtures";

import { HeroBlock } from "./index";

storiesOf("HeroBlock", module)
    .add(
        "Empty",
        (() => <HeroBlock className="myClass" />)
    )
    .add(
        "With image",
        (() => (
            <HeroBlock heroImage={project.heroImage} />
        ))
    )
    .add(
        "With video",
        (() => (
            <HeroBlock
                heroImage={project.heroImage}
                heroVideo={project.heroVideo}
            />
        ))
    )
    .add(
        "With children",
        (() => (
            <HeroBlock heroImage={project.heroImage}>
                <h1>{project.caseStudyTitle}</h1>
            </HeroBlock>
        ))
    );
