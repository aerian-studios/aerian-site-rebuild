import * as React from "react";

import * as styles from "./SocialGrid.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const SocialGrid: React.SFC<Props> = ({ style, className }) => (
    <>
        <div className={styles.grid1}>Facebook</div>
        <div className={styles.grid2}>Twitter</div>
        <div className={styles.grid3}>G+</div>
        <div className={styles.grid4}>LinkedIn</div>
    </>
);
export default SocialGrid;
