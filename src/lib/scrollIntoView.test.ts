/// <reference types="@types/jest" />
import * as renderer from "react-test-renderer";
import * as scrollIntoView from "./scrollIntoView";

it("Should not have a margin", () => {
    const element = document.createElement("div");
    element.style.cssText = "margin-top: 300px;";
    document.body.appendChild(element);

    const doScrollingSpy = jest.spyOn(scrollIntoView, "doScrolling");

    scrollIntoView.scrollToElement(element, 0);
    expect(doScrollingSpy).toHaveBeenCalledWith(0, 0);
    // window.setTimeout(() => {
    //     expect(document.body.scrollTop).toEqual(300);
    // });
});
it("Shouldmemoize a margin", () => {
    const element = document.createElement("div");
    element.style.cssText = "margin-top: 300px;";
    document.body.appendChild(element);

    const doScrollingSpy = jest.spyOn(scrollIntoView, "doScrolling");

    scrollIntoView.setTopMargin(300);

    scrollIntoView.scrollToElement(element, 0);
    expect(doScrollingSpy).toHaveBeenCalledWith(-300, 0);
});
