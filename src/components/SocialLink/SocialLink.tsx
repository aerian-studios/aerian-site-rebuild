import classNames from "classnames";
import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import * as styles from "./SocialLink.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    icon: IconDefinition;
    iconsStyle: any;
    url: string;
    children?: React.ReactFragment;
}

export const SocialLink: React.SFC<Props> = ({
    style,
    className,
    icon,
    url,
    iconsStyle,
    children
}) => (
    <span className={classNames(styles.item, className)} style={style}>
        <a
            href={url}
            rel="nofollow noreferer"
            aria-label={`Visit Aerian studios on ${icon.iconName}`}
        >
            <FontAwesomeIcon icon={icon} className={iconsStyle} />
            {children}
        </a>
    </span>
);
export default SocialLink;
