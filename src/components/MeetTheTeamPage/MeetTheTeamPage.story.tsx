import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { meetTheTeam } from "../../types/fixtures";
import { MeetTheTeamPage } from "./index";

storiesOf("MeetTheTeamPage", module).add(
    "Default",
    withInfo({ inline: true })(() => <MeetTheTeamPage page={meetTheTeam} />)
);
