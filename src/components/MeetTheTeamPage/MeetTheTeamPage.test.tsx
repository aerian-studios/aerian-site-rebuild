/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { meetTheTeam } from "../../types/fixtures";
import { MeetTheTeamPage } from "./index";

describe("MeetTheTeamPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<MeetTheTeamPage page={meetTheTeam} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
