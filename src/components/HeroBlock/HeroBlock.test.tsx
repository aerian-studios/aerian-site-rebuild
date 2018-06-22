/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { HeroBlock } from "./HeroBlock";

describe("HeroBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<HeroBlock>Hero block</HeroBlock>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
