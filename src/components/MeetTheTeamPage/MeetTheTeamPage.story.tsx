import * as React from "react";

import { storiesOf } from "@storybook/react";

import { meetTheTeam } from "../../types/fixtures";
import { MeetTheTeamPage } from "./index";

storiesOf("MeetTheTeamPage", module).add("Default", () => (
    <MeetTheTeamPage page={meetTheTeam} />
));
