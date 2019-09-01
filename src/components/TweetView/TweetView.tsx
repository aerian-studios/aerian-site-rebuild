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
    const data: { tweet: Tweet } = useStaticQuery(graphql`
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
    return (
        <div className={classNames(styles.component, className)} style={style}>
            <div className={styles.tweet}>{parseTweet(data.tweet)}</div>
            <a className={styles.user} href="https://twitter.com/aerianstudios">
                <img src={data.tweet.user.image} alt="Aerian" />
                <p className={styles.name}>
                    <strong>Tweeted by</strong>
                    Aerian
                </p>
            </a>
        </div>
    );
};
export default TweetView;
