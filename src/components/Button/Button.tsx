import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import classNames from "classnames";
import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "./Button.module.scss";

interface ElProps {
    style?: React.CSSProperties;
    className?: string;
    arrow?: boolean;
    alternate?: boolean;
}

interface Props {
    style?: React.CSSProperties;
    className?: string;
    arrow?: boolean;
    alternate?: boolean;
    [name: string]: React.CSSProperties | string | boolean | undefined;
}

export const Button: React.SFC<Props> = ({
    children,
    style,
    className,
    arrow,
    alternate,
    ...rest
}) => (
    <button
        className={classNames(
            styles.component,
            { [styles.alternate]: alternate, [styles.arrow]: arrow },
            className
        )}
        style={style}
        {...rest}
    >
        {children}
        {arrow && (
            <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
        )}
    </button>
);
export default Button;
