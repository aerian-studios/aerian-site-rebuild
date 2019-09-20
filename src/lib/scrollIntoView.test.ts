import * as scrollIntoView from "./scrollIntoView";

xdescribe("scrollIntoView", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should not have a margin", () => {
        const element = document.createElement("div");
        element.style.cssText = "margin-top: 300px;";
        document.body.appendChild(element);

        const doScrollingSpy = jest.spyOn(scrollIntoView, "doScrolling");

        scrollIntoView.scrollToElement(element, 0);
        expect(doScrollingSpy).toHaveBeenCalledWith(0, 0);
    });
    it("Should memoize a margin", () => {
        const element = document.createElement("div");
        element.style.cssText = "margin-top: 300px;";
        document.body.appendChild(element);

        const doScrollingSpy = jest.spyOn(scrollIntoView, "doScrolling");

        scrollIntoView.setTopMargin(300);

        scrollIntoView.scrollToElement(element, 0);
        expect(doScrollingSpy).toHaveBeenCalledWith(-300, 0);
    });
});
