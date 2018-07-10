/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { client } from "../../types/fixtures";
import { ClientLogo } from "./index";

describe("ClientLogo", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ClientLogo
                    className="myClass"
                    client={client}
                    style={{ width: 400 }}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
