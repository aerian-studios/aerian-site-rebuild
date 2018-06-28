/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MainNavigation } from "./index";

const pages = {allPagesJson:{
    edges: [
        {
            id: 'page1',
            path: '/page1',
            title: 'Page 1'
        },
        {
            id: 'page2',
            path: '/page2',
            title: 'Page 2'
        },
    ]
}}

describe("MainNavigation", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<MainNavigation className="myClass" pages={pages} activePath={pages.allPagesJson.edges[1].path} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("sets '.active-path' to the matching menu item", () => {
        const tree = renderer
            .create(<MainNavigation className="myClass" pages={pages} activePath={pages.allPagesJson.edges[1].path} />)
            .toJSON();
        expect(tree).toMatchSnapshot();

        console.log(tree)
    })
);
