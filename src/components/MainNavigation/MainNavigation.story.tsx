import * as React from "react";

import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";
import { PageListNode } from "../../types/data";
import { MainNavigation } from "./index";

const pages: PageListNode[] = [
    {
        node: {
            id: "page1",
            path: "/page1",
            title: "Page 1"
        }
    },
    {
        node: {
            id: "page2",
            path: "/page2",
            title: "Page 2"
        }
    }
];

storiesOf("MainNavigation", module)
    .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
    .add("Page 1 active", () => (
        <MainNavigation className="myClass" pages={pages} activePath="/page1" />
    ))
    .add("Page 2 active", () => (
        <MainNavigation className="myClass" pages={pages} activePath="/page2" />
    ));
