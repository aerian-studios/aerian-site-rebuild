/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { HeroBlock } from "./index";

describe("HeroBlock", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <HeroBlock className="myClass">
                    <h1>{project.caseStudyTitle}</h1>
                </HeroBlock>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with `heroImage", () => {
        const tree = renderer
            .create(
                <HeroBlock className="myClass" heroImage={project.heroImage}>
                    <h1>{project.caseStudyTitle}</h1>
                </HeroBlock>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with heroVideo", () => {
        const tree = renderer
            .create(
                <HeroBlock
                    className="myClass"
                    heroImage={project.heroImage}
                    heroVideo={project.heroVideo}
                >
                    <h1>{project.caseStudyTitle}</h1>
                </HeroBlock>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
