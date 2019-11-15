import * as React from "react";

import * as styles from "./PageFooter.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}
export const PageFooter: React.FC<Props> = ({ children, style, className }) => {
    return (
        <footer
            className={[styles.component, className, "block--full"].join(" ")}
            style={style}
        >
            <div className={styles.footerContainer}>{children}</div>
        </footer>
    );
};
export default PageFooter;
