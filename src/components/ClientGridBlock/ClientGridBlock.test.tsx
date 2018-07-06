/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router-dom";
import { client } from "../../types/fixtures";
import { ClientGridBlock } from "./index";

describe("ClientGridBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <ClientGridBlock clients={[client]} className="myClass" />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
