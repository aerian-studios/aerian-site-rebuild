/// <reference types="@types/jest" />
import * as React from "react";
import * as renderer from "react-test-renderer";
import { SectionNav } from ".";

const keys = {
    caseStudy: "Introduction",
    gallery: "Gallery",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "The Result"
};

describe("SectionNav", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SectionNav
                    className="myClass"
                    onNavigation={() => false}
                    keyConsts={keys}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
