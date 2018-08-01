import classNames from "classnames";
import * as React from "react";
import * as styles from "./Block.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    alternate?: boolean;
}

export const Block: React.SFC<Props> = ({
    children,
    style,
    className,
    alternate
}) => (
    <div
        className={classNames([{ [styles.alternate]: alternate }, className])}
        style={style}
    >
        {children}
    </div>
);
export default Block;
