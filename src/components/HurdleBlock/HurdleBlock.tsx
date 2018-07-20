import * as React from "react";
import Markdown from "react-markdown";
import { Hurdle } from "../../types/data";
import { Image } from "../Image";
import * as styles from "./HurdleBlock.module.scss";
interface Props {
    style?: React.CSSProperties;
    className?: string;
    hurdle: Hurdle;
}

export const HurdleBlock: React.SFC<Props> = ({ style, className, hurdle }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <Image source={hurdle.image} alt={hurdle.title} />
        <h3>{hurdle.title}</h3>
        <Markdown source={hurdle.text} />
    </div>
);
export default HurdleBlock;
