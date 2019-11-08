import * as React from "react";
import classNames from "classnames";

import * as styles from "./TweetView.module.scss";
import { useStaticQuery, graphql } from "gatsby";
import { parseTweet } from "../../lib/twitter";
import { Tweet } from "../../types/data";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const TweetView: React.SFC<Props> = ({ children, style, className }) => {
    let data: { tweet: Tweet } | null = null;
    try {
        // Oh the huge manatee 🐳
        //  This is purely for the purposes of Storybooks, where static queries don't work
        // eslint-disable-next-line react-hooks/rules-of-hooks
        data = useStaticQuery(graphql`
            query MyQuery {
                tweet: twitterStatusesUserTimelineAerian {
                    full_text
                    entities {
                        urls {
                            display_url
                            expanded_url
                            indices
                            url
                        }
                    }
                    user {
                        image: profile_image_url_https
                    }
                }
            }
        `);
    } catch (e) {
        console.warn("You shouldn't see this unless you're in Storybooks");
    }
    return (
        <div className={classNames(styles.component, className)} style={style}>
            {data ? (
                <>
                    <div className={styles.tweet}>{parseTweet(data.tweet)}</div>
                    <a
                        className={styles.user}
                        href="https://twitter.com/aerianstudios"
                    >
                        <img src={data.tweet.user.image} alt="Aerian" />
                        <p className={styles.name}>
                            <strong>Tweeted by</strong>
                            Aerian
                        </p>
                    </a>
                </>
            ) : null}
        </div>
    );
};
export default TweetView;
