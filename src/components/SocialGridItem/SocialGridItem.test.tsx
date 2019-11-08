import { faVimeoV } from "@fortawesome/free-brands-svg-icons/faVimeoV";
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SocialGridItem } from "./index";

describe("SocialGridItem", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SocialGridItem
                    className="myClass"
                    icon={faVimeoV}
                    url="https://vimeo.com/aerianstudios"
                    text="aerian-studios"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
