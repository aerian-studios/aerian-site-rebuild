import React from "react";

import { storiesOf } from "@storybook/react";

import { TweetView } from "./index";
import { fakeGQLResponseByName } from "../../lib/gatsbyShim";
import { tweet } from "../../types/fixtures";

fakeGQLResponseByName("TweetQuery", { tweet });

storiesOf("TweetView", module).add("Default", () => <TweetView />);
