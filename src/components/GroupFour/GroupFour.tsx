import * as React from "react";

import * as styles from "./GroupFour.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const GroupFour: React.SFC<Props> = ({ children, style, className }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {children}
    </div>
);
export default GroupFour;
