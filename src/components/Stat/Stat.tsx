import * as React from "react";

import * as styles from "./Stat.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;

    statNumber: number;

    statDescription: string;
}

export const Stat: React.SFC<Props> = ({
    style,
    className,
    statNumber,
    statDescription
}) => (
    <figure
        className={[styles.stat, className, "stat"].join(" ")}
        style={style}
    >
        <span className={[styles.statNumber, "statNumber"].join(" ")}>
            <strong>{statNumber}</strong>
        </span>
        <span className={[styles.statDescription, "statDescription"].join(" ")}>
            {statDescription}
        </span>
    </figure>
);
export default Stat;
