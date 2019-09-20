import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactDetails } from "./index";

describe("ContactDetails", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ContactDetails
                    className="myClass"
                    phoneNumber="0345 408 6009"
                    street="The Old Malthouse, Mill Lane"
                    locality="Box"
                    region="Wiltshire"
                    postcode="SN13 8PN"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
