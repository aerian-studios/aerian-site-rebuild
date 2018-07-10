import * as React from "react";

import * as styles from "./SocialGrid.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const SocialGrid: React.SFC<Props> = ({ style, className }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h2>SocialGrid</h2>
    </div>
);
export default SocialGrid;
