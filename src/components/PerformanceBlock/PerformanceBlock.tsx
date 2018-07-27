import * as React from "react";

import { Performance as PerformanceType } from "../../types/data";
import { GroupThree } from "../GroupThree";
import { Performance } from "../Performance";
import * as styles from "./PerformanceBlock.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    performance: PerformanceType[];
}

export const PerformanceBlock: React.SFC<Props> = ({
    style,
    className,
    performance
}) =>
    performance.length === 0 ? null : (
        <div className={[styles.component, className].join(" ")} style={style}>
            <h2>Performance &amp; Statistics</h2>
            <GroupThree>
                {performance.map(perf => (
                    <Performance performance={perf} key={perf.title} />
                ))}
            </GroupThree>
        </div>
    );
export default PerformanceBlock;
