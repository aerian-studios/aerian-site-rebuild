import * as React from "react";

import * as renderer from "react-test-renderer";

import { client } from "../../types/fixtures";
import { ClientGridBlock } from "./index";

describe("ClientGridBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ClientGridBlock clients={[client]} className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
