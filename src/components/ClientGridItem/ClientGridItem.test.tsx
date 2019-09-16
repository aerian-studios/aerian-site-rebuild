import * as React from "react";

import * as renderer from "react-test-renderer";

import { client } from "../../types/fixtures";
import { ClientGridItem } from "./index";

describe("ClientGridItem", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ClientGridItem client={client} className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
