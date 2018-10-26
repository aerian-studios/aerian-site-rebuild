import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import * as styles from "./SocialLink.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    icon: IconDefinition;
    url: string;
}

export const SocialLink: React.SFC<Props> = ({
    style,
    className,
    icon,
    url
}) => (
    <span className={[styles.item, className].join(" ")} style={style}>
        <a href={url} rel="nofollow noreferer" title={icon.iconName}>
            <FontAwesomeIcon icon={icon} />
        </a>
    </span>
);
export default SocialLink;
