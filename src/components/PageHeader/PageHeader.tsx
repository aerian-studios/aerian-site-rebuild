import classNames from "classnames";
import * as React from "react";

import * as styles from "./PageHeader.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const PageHeader: React.SFC<Props> = ({
    children,
    style,
    className
}) => (
    <header
        id="page-header"
        style={style || {}}
        className={classNames(styles.pageHeader, className)}
    >
        {children}
    </header>
);
