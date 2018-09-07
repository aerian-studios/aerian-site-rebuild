import * as React from "react";


import { storiesOf } from "@storybook/react";

import { Image } from "./index";

import { image, imageSharp } from "../../types/fixtures";

storiesOf("Image", module)
    .add(
        "With sharp",
        (() => <Image source={imageSharp} />)
    )
    .add(
        "With src",
        (() => <Image source={image} />)
    );
