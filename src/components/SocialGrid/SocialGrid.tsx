import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faVimeoV } from "@fortawesome/free-brands-svg-icons/faVimeoV";
import classNames from "classnames";
import * as React from "react";

import { Card } from "../Card";
import { SocialGridItem } from "../SocialGridItem";
import * as styles from "./SocialGrid.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const SocialGrid: React.SFC<Props> = ({ style, className }) => (
    <>
        <Card className={classNames(styles.gridItem, styles.grid1)}>
            <SocialGridItem
                icon={faFacebook}
                url="https://www.facebook.com/aerianstudios/"
                text="aerianstudios"
            />
        </Card>
        <Card className={classNames(styles.gridItem, styles.grid2)}>
            <SocialGridItem
                icon={faTwitter}
                url="https://twitter.com/aerianstudios"
                text="@aerianstudios"
            />
        </Card>
        <Card className={classNames(styles.gridItem, styles.grid3)}>
            <SocialGridItem
                icon={faVimeoV}
                url="https://vimeo.com/aerianstudios"
                text="aerian-studios"
            />
        </Card>
        <Card className={classNames(styles.gridItem, styles.grid4)}>
            <SocialGridItem
                icon={faLinkedin}
                url="https://www.linkedin.com/company/aerian-studios"
                text="aerian-studios"
            />
        </Card>
    </>
);
export default SocialGrid;
