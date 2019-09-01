import * as React from "react";

import renderer from "react-test-renderer";

import { TweetView } from ".";

import { mockTweet } from "../../lib/twitter.test";
import { useStaticQuery } from "gatsby";

describe("TweetView", () => {
    beforeEach(async () => {
        useStaticQuery.mockImplementationOnce(() => mockTweet);
    });
    it("renders correctly", () => {
        const tree = renderer
            .create(<TweetView className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
