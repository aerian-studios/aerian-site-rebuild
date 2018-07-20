import classNames from "classnames";
import * as React from "react";

import { ImageField } from "../../types/data";
import { FullScreenMedia } from "../FullScreenMedia";
import * as styles from "./HeroBlock.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    heroVideo?: string;
    heroImage?: ImageField;
}

export const HeroBlock: React.SFC<Props> = ({
    children,
    style,
    className,
    heroVideo,
    heroImage
}) => (
    <>
        <div className={classNames(styles.HeroBlock, className)} style={style}>
            <FullScreenMedia
                image={heroImage}
                aria-labelled-by="page-title"
                video={heroVideo}
                wrapperClassName={styles.heroMedia}
            />
            <div className={styles.heroContent}>{children}</div>
        </div>
        <div className={styles.placeholder} />
    </>
);
export default HeroBlock;
