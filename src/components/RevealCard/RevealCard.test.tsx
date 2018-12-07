/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";
import { Edge, NodeList, ProjectBox } from "../../types/data";
import { projectBox } from "../../types/fixtures";

import { RevealCard } from "./index";

describe("Revealcard", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<RevealCard className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders visible cards", () => {
        const card = renderer.create(
            <RevealCard>
                <p>Hi</p>
            </RevealCard>
        );
        (card.getInstance() as any).setVisible(true);
        const tree = card.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
