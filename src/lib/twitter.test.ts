import { Tweet } from "../types/data";
import { parseTweet } from "./twitter";
import renderer from "react-test-renderer";

export const mockTweet: Tweet = {
    full_text:
        "MOCK!: proud that our partners over at @CRbuildpeace are being featured by our friends at @BBCRadio4 this Sunday. What's more, we've recently just launched their new site - https://t.co/Os80j45F1N. Check it out! https://t.co/ewD0FdQT49",
    user: {
        image:
            "https://pbs.twimg.com/profile_images/378800000156917292/cba17ed82c5a99f3b91e805534b2d10f_normal.png"
    },
    entities: {
        urls: [
            {
                display_url: "c-r.org",
                expanded_url: "http://www.c-r.org",
                indices: [173, 196],
                url: "https://t.co/Os80j45F1N"
            },
            {
                display_url: "twitter.com/CRbuildpeace/s…",
                expanded_url:
                    "https://twitter.com/CRbuildpeace/status/1164462963790667776",
                indices: [212, 235],
                url: "https://t.co/ewD0FdQT49"
            }
        ]
    }
};

describe("The tweet parser", () => {
    it("Should parse a tweet with links", () => {
        const parsed = parseTweet(mockTweet);
        const tree = renderer.create(parsed).toJSON();
    });
});
