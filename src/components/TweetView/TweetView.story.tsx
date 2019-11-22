import * as React from "react";

import { storiesOf } from "@storybook/react";

import { TweetView } from "./index";
import { fakeGQLResponseOnce } from "../../lib/gatsbyShim";
import { tweet } from "../../types/fixtures";



fakeGQLResponseOnce({tweet})

storiesOf("TweetView", module).add("Default", () => <TweetView />);
