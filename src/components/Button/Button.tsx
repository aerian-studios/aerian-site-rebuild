import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import classNames from "classnames";
import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    arrow?: boolean;
    alternate?: boolean;
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
