
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ClientLogo } from "./index";


storiesOf("ClientLogo", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <ClientLogo  className="myClass" imgSrc="https://i.imgur.com/BOOPM8n.jpg" imgAlt="Family enjoying the beach circa 1950s" style={{width: '50%'}} />
)));
