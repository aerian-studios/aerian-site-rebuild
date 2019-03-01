import classnames from "classnames";
import * as React from "react";

import * as styles from "./Card.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const Card: React.SFC<Props> = props => {
    return (
        <div
            className={classnames(styles.card, props.className)}
            style={props.style}
        >
            {props.children}
        </div>
    );
};
export default Card;
