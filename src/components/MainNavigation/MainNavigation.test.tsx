/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { PageListNode } from "../../types/data";
import { MainNavigation } from "./index";

import { MemoryRouter } from "react-router-dom";

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

describe("MainNavigation", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <MainNavigation className="myClass" pages={pages} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
