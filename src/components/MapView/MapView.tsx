import * as React from "react";

import * as styles from "./MapView.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const MapView: React.SFC<Props> = ({ children, style, className }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h2>MapView</h2>
    </div>
);
export default MapView;
