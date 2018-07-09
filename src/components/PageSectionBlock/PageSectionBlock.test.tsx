/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { pageSection } from "../../types/fixtures";
import { PageSectionBlock } from "./index";

describe("PageSectionBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<PageSectionBlock section={pageSection} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
