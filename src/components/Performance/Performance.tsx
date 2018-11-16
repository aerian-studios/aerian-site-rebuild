import * as React from "react";
import { Performance as PerformanceType } from "../../types/data";
import * as styles from "./Performance.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;

    performance: PerformanceType;
}

export const Performance: React.SFC<Props> = ({
    style,
    className,
    performance
}) => (
    <figure className={[styles.perfomance, className].join(" ")} style={style}>
        <span className={styles.perfomanceNumber}>
            <strong>{performance.title}</strong>
        </span>
        <span className={styles.perfomanceDescription}>{performance.text}</span>
    </figure>
);
export default Performance;
