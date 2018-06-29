/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Image } from "./index";

describe("Image", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Image source="https://beta.aerian.com/static/paolo-funny-005127dcb434602413b9e1fcb297282d-66790.png" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
