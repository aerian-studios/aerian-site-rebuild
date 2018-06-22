import * as React from "react";

import * as styles from "./Stat.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const Stat: React.SFC<Props> = ({ children, style, className }) => (
    <div className={[styles.base, className].join(" ")} style={style}>
        {children}
    </div>
);
export default Stat;
