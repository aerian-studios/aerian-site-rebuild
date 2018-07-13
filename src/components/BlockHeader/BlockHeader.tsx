import * as React from "react";

import * as styles from "./BlockHeader.scss";

interface Props {
    title: string;
    text: string;
    style?: React.CSSProperties;
    className?: string;
}

export const BlockHeader: React.SFC<Props> = ({
    title,
    text,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h2>{title}</h2>
        <p>{text}</p>
    </div>
);
export default BlockHeader;
