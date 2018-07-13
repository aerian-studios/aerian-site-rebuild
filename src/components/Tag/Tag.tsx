import * as React from "react";

import * as styles from "./Tag.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    value: string;
}

export const Tag: React.SFC<Props> = ({ value, style, className }) => (
    <li className={[styles.component, className].join(" ")} style={style}>
        {value}
    </li>
);
export default Tag;
