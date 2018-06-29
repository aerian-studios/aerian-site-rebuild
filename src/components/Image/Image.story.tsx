import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ImageSharp } from "../../types/data";
import { Image } from "./index";

import { image, imageSharp } from "../../types/fixtures";

storiesOf("Image", module)
    .add(
        "With sharp",
        withInfo({ inline: true })(() => <Image source={imageSharp} />)
    )
    .add(
        "With src",
        withInfo({ inline: true })(() => <Image source={image} />)
    );
