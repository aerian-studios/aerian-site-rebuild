import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import classNames from "classnames";
import { Link } from "gatsby";
import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GatsbyLinkProps } from "gatsby-link";
import * as styles from "./LinkButton.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    arrow?: boolean;
    alternate?: boolean;
    to: string;
    // use the rest/spread to add onClick, tabIndex, etc
}

export const LinkButton: React.SFC<Props> = ({
    children,
    style,
    className,
    arrow,
    alternate,
    to,
    ...rest
}) => {
    return (
        <Link
            className={classNames(
                styles.component,
                { [styles.alternate]: alternate, [styles.arrow]: arrow },
                className
            )}
            style={style}
            {...rest}
            to={to}
        >
            {children}
            {arrow && (
                <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
            )}
        </Link>
    );
};

export default LinkButton;
