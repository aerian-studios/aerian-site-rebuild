import * as React from "react";

import * as styles from "./Card.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    link: string;
}

export const Card: React.SFC<Props> = ({
    children,
    style,
    className,
    link
}) => (
    <div className={[styles.card, className].join(" ")} style={style}>
        <a href={link}>{children}</a>
    </div>
);
export default Card;
