/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { StaffDetail } from "./index";

const staff = {
    name: "Matt",
    description: "Description",
    role: "Role",
    skills: ["AWS", "Git"],
    fact: "Fact",
    image: "../../../static/assets/imported/528/wayne-funny.png"
};

describe("StaffDetail", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<StaffDetail className="myClass" staff={staff} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
