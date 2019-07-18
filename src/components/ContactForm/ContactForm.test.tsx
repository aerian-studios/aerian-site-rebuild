import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactForm } from "./index";

describe("ContactForm", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ContactForm className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
