/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ClientLogo } from "./index";


describe("ClientLogo", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<ClientLogo className="myClass" imgSrc="https://i.imgur.com/BOOPM8n.jpg" imgAlt="Family enjoying the beach circa 1950s" style={{width: '50%'}} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));