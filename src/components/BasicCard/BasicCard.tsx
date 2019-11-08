import React from "react";
import classNames from "classnames";

import styles from "./BasicCard.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const BasicCard: React.FC<Props> = ({ children, style, className }) => (
    <div className={classNames(styles.component, className)} style={style}>
        {children}
    </div>
);
export default BasicCard;
