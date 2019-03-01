import classNames from "classnames";
import { Link } from "gatsby";
import * as React from "react";

import * as styles from "./SiteLogo.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    logo?: string;
    alt: string;
}

export const SiteLogo: React.SFC<Props> = ({
    style,
    className,
    logo = "../../../static/assets/furniture/logo.svg",
    alt
}) => (
    <nav className={classNames(styles.component, className)} style={style}>
        <Link to="/">
            <img src={logo} alt={alt} />
        </Link>
    </nav>
);
export default SiteLogo;
