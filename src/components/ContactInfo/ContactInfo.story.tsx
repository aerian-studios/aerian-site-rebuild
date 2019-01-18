import * as React from "react";

import { storiesOf } from "@storybook/react";

import { ContactInfo } from "./index";

storiesOf("ContactInfo", module).add("Default", () => (
    <ContactInfo
        className="myClass"
        title="Drop in and say hi"
        phoneTitle="Give us a call"
        phoneNumber="0345 408 6009"
        organisationName="Aerian"
        street="The Old Malthouse, Mill Lane"
        locality="Box"
        region="Wiltshire"
        postcode="SN13 8PN"
        emailTitle="Send us a message"
        email="info@aerian.com"
    />
));
