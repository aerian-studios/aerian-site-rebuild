/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import {
    getHeights,
    hideShow,
    hideStyles,
    setHeight,
    setHeightStyles,
    showStyles,
    StaffDetail
} from "./StaffDetail";

import { person } from "../../types/fixtures";

const createDetailsEls = (): HTMLElement => {
    const el = document.createElement("aside");
    const first = document.createElement("div");
    const second = document.createElement("figure");

    first.style.height = "100px";
    second.style.height = "300px";
    el.appendChild(first);
    el.appendChild(second);

    return el;
};

describe("StaffDetail", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<StaffDetail staff={person} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("sets the height passed to element", async () => {
        const el = createDetailsEls();

        await setHeightStyles(el, 300);
        expect(el.style.height).toEqual("300px");
    });
    it("rejects if it doesn't have the right params", async () => {
        const el = createDetailsEls();
        const func = jest.fn();

        const result = await setHeightStyles(null, 300).catch(() => {
            func();
        });

        expect(result).toBeFalsy();
        expect(func).toHaveBeenCalled();
    });

    it("adds hide styles to el passed", async () => {
        const el = createDetailsEls();

        await hideShow(el);
        expect(el.style.cssText).toContain("visibility: hidden");
    });
    it("adds show styles to el passed", async () => {
        const el = createDetailsEls();

        await hideShow(el, false);
        expect(el.style.cssText).toContain("visibility: visible");
    });

    it("gets heights from children passed", async () => {
        const el = createDetailsEls();
        const result = await getHeights(el.children);

        expect(result.length).toEqual(2);
        expect(result).toEqual([0, 0]);
    });

    it("returns the correct styles for setHeight", async () => {
        const el = createDetailsEls();
        const errFunc = jest.fn();
        const result = await setHeight(el).catch(() => {
            errFunc();
        });

        expect(errFunc).not.toHaveBeenCalled();
        expect(result && result.tagName).toEqual("ASIDE");
        expect(el.style.height).toEqual("160px");
    });
});
