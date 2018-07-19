import classNames from "classnames";
import * as React from "react";

import styles from "./PageHeader.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

const layoutClassNames = ["block", "block--full", "layout-grid"];

export const PageHeader: React.SFC<Props> = ({
    children,
    style,
    className
}) => (
    <header
        id="page-header"
        style={style || {}}
        className={classNames(layoutClassNames, styles.component, className)}
    >
        {children}
    </header>
);
