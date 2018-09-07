import * as React from "react";


import { storiesOf } from "@storybook/react";

import { PageFooter } from "./index";

storiesOf("PageFooter", module)
    .add(
        "Default",
        (() => (
            <PageFooter className="myClass">
                <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p>This is the social icons</p>
                </div>
            </PageFooter>
        ))
    )
    .add(
        "Three children",
        (() => (
            <PageFooter className="myClass">
                <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p>This is the social icons</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0 }}>Some other</p>
                    <p style={{ margin: 0 }}>child element</p>
                    <p style={{ margin: 0 }}>that is for testing only</p>
                </div>
            </PageFooter>
        ))
    )
    .add(
        "Show borders",
        (() => (
            <PageFooter className="myClass">
                <div style={{ textAlign: "center", border: "1px solid red" }}>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                    <p style={{ margin: 0 }}>This is the address</p>
                </div>
                <div style={{ textAlign: "center", border: "1px solid red" }}>
                    <p>This is the social icons</p>
                </div>
            </PageFooter>
        ))
    );
