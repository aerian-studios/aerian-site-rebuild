
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { SquareCard } from "./index";


storiesOf("SquareCard", module).add(
    "Default", 
    () => (
    <SquareCard  className="myClass" />
));
