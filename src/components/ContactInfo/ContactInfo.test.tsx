import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactInfo } from "./index";

describe("ContactInfo", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ContactInfo
                    className="myClass"
                    title="Test title"
                    organisationName="test"
                    street="test"
                    locality="test"
                    postcode="test"
                    region="test"
                    phoneTitle="test"
                    phoneNumber="test"
                    emailTitle="test"
                    email="test"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
