
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { SquareCarousel } from "./index";


storiesOf("SquareCarousel", module).add(
    "Default", 
    () => (
    <SquareCarousel  className="myClass" />
));
