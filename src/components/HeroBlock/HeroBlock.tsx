import * as React from "react";

import { FullScreenMedia } from "../FullScreenMedia";

import { ImageField } from "../../types/data";
import * as styles from "./HeroBlock.scss";

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
    <div className={[styles.component, className].join(" ")} style={style}>
        <FullScreenMedia
            image={heroImage}
            aria-labelled-by="page-title"
            video={heroVideo}
        />
        {children}
    </div>
);
export default HeroBlock;
