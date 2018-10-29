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
    <section
        className={classNames([
            { [styles.alternate]: alternate },
            styles.Block,
            className
        ])}
        style={style}
    >
        {children}
    </section>
);
export default Block;
