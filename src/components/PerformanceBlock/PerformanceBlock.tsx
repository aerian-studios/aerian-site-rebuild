import * as React from "react";

import { Performance } from "../../types/data";
import { GroupThree } from "../GroupThree";
import * as styles from "./PerformanceBlock.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    performance: Performance[];
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
                    <div key={perf.title}>
                        <h4>{perf.title}</h4>
                        <p>{perf.text}</p>
                    </div>
                ))}
            </GroupThree>
        </div>
    );
export default PerformanceBlock;
