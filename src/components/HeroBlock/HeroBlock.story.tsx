import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { project } from "../../types/fixtures";

import { HeroBlock } from "./index";

storiesOf("HeroBlock", module)
    .add(
        "Empty",
        withInfo({ inline: true })(() => <HeroBlock className="myClass" />)
    )
    .add(
        "With image",
        withInfo({ inline: true })(() => (
            <HeroBlock heroImage={project.heroImage} />
        ))
    )
    .add(
        "With video",
        withInfo({ inline: true })(() => (
            <HeroBlock
                heroImage={project.heroImage}
                heroVideo={project.heroVideo}
            />
        ))
    )
    .add(
        "With children",
        withInfo({ inline: true })(() => (
            <HeroBlock heroImage={project.heroImage}>
                <h1>{project.caseStudyTitle}</h1>
            </HeroBlock>
        ))
    );
