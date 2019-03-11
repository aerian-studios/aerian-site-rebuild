
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { SlidingCarousel } from "./index";


storiesOf("SlidingCarousel", module).add(
    "Default", 
    () => (
    <SlidingCarousel  className="myClass" />
));
