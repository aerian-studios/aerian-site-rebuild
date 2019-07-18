import * as React from "react";

import * as renderer from "react-test-renderer";

import { MapView } from "./index";

describe("HalfBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <div style={{ height: 400 }}>
                    <MapView position={[51.41942, -2.253581]} />
                </div>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
