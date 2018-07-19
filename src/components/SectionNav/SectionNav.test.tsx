/// <reference types="@types/jest" />
import * as React from "react";

import { MemoryRouter } from "react-router-dom";
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
                <MemoryRouter>
                    <SectionNav
                        className="myClass"
                        onNavigation={() => false}
                        keyConsts={keys}
                    />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders with the correct nav items", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <SectionNav
                        className="myClass"
                        onNavigation={() => false}
                        keyConsts={keys}
                    />
                </MemoryRouter>
            )
            .toJSON();

        expect(tree.children[0].children.length).toEqual(5);
    });
});
