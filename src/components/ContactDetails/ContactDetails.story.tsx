
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ContactDetails } from "./index";


storiesOf("ContactDetails", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <ContactDetails  className="myClass" phoneNumber="0345 408 6009" street="The Old Malthouse, Mill Lane" locality="Box" postcode="SN13 8PN" />
))).add(
    "No Phone Number", 
    withInfo({ inline: true })(() => (
    <ContactDetails  className="myClass" street="The Old Malthouse, Mill Lane" locality="Box" postcode="SN13 8PN" />
))).add(
    "No Address", 
    withInfo({ inline: true })(() => (
    <ContactDetails  className="myClass" phoneNumber="0345 408 6009" />
)));
