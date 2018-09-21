import * as React from "react";

import { storiesOf } from "@storybook/react";

import { ContactDetails } from "./index";

storiesOf("ContactDetails", module)
    .add("Default", () => (
        <ContactDetails
            className="myClass"
            phoneNumber="0345 408 6009"
            street="The Old Malthouse, Mill Lane"
            locality="Box"
            postcode="SN13 8PN"
        />
    ))
    .add("No Phone Number", () => (
        <ContactDetails
            className="myClass"
            street="The Old Malthouse, Mill Lane"
            locality="Box"
            postcode="SN13 8PN"
        />
    ))
    .add("No Address", () => (
        <ContactDetails className="myClass" phoneNumber="0345 408 6009" />
    ));
