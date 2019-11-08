import * as React from "react";

import * as renderer from "react-test-renderer";

import { about, client } from "../../types/fixtures";
import { AboutPage } from "./index";

describe("AboutPage", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<AboutPage page={about} clients={[client]} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
