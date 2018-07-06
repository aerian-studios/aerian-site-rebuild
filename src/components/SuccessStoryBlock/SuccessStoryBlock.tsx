import * as React from "react";

import { SuccessStory } from "../../types/data";
import { GroupFour } from "../GroupFour";
import { Image } from "../Image";
import * as styles from "./SuccessStoryBlock.scss";
interface Props {
    successStory: SuccessStory;
    style?: React.CSSProperties;
    className?: string;
}

export const SuccessStoryBlock: React.SFC<Props> = ({
    style,
    className,
    successStory
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h2>
            <span>Success story</span> {successStory.title}
        </h2>
        <GroupFour>
            {successStory.stats &&
                successStory.stats.map(stat => (
                    // Stat
                    <div key={stat.title}>
                        <Image source={stat.image} />
                        <h3>{stat.title}</h3>
                        <p>{stat.text}</p>
                    </div>
                ))}
        </GroupFour>
    </div>
);
export default SuccessStoryBlock;
