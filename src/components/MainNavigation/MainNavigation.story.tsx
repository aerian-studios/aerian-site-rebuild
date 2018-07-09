import * as React from "react";

import { action } from "@storybook/addon-actions";
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
    },
    {
        node: {
            id: "page3",
            path: "/page3",
            title: "Page 3"
        }
    },
    {
        node: {
            id: "page4",
            path: "/page4",
            title: "Page 4"
        }
    }
];

import * as styles from "../PageNavBar/PageNavBar.scss";

const onClick = () => {};

storiesOf("MainNavigation", module)
    .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
    .add("No context styles", () => (
        <MainNavigation
            className={styles.nav}
            pages={pages}
            onClick={action("clicked navigator")}
        />
    ))
    .add("With context styles", () => (
        <MainNavigation
            className={styles.nav}
            pages={pages}
            activeLinkClassName={styles.activeLink}
            linkClassName={styles.link}
            onClick={action("clicked navigator")}
        />
    ));
