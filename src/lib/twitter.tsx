import React from "react";

import { Tweet } from "../types/data";

export const parseTweet = (tweet: Tweet) => {
    const { urls } = tweet.entities;
    if (!urls || !urls.length) {
        return tweet.full_text;
    }

    const text = tweet.full_text;

    const elements: React.ReactNode[] = [text.substring(0, urls[0].indices[0])];
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        elements.push(
            <a
                key={url.url}
                href={url.expanded_url}
                target="_blank"
                rel="noreferrer noopener nofollow"
            >
                {url.display_url}
            </a>
        );
        const nextIndex =
            i === urls.length - 1 ? text.length : urls[i + 1].indices[0];
        elements.push(text.substring(url.indices[1], nextIndex));
    }

    return <>{elements}</>;
};
