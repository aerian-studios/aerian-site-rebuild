import * as React from "react";
import { Hurdle } from "../../types/data";
import { Image } from "../Image";
import * as styles from "./HurdleBlock.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    hurdle: Hurdle;
}

export const HurdleBlock: React.SFC<Props> = ({ style, className, hurdle }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <Image source={hurdle.image} alt={hurdle.title} />
        <h3>{hurdle.title}</h3>
        <p>{hurdle.text}</p>
    </div>
);
export default HurdleBlock;
