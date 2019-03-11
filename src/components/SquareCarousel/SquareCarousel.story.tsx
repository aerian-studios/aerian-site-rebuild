import * as React from "react";

import { storiesOf } from "@storybook/react";

import { SquareCarousel } from "./index";
import { projectBox } from "../../types/fixtures";

const data = [{ node: projectBox }];

storiesOf("SquareCarousel", module).add("Default", () => (
    <SquareCarousel className="myClass" data={data} />
));
