import { faVimeoV } from "@fortawesome/free-brands-svg-icons/faVimeoV";
import * as React from "react";

import { storiesOf } from "@storybook/react";

import { SocialGridItem } from "./index";

storiesOf("SocialGridItem", module).add("Default", () => (
    <SocialGridItem
        className="myClass"
        icon={faVimeoV}
        url="https://vimeo.com/aerianstudios"
        text="aerian-studios"
    />
));
