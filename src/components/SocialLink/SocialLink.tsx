import * as React from "react";

import { IconName } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as styles from "./SocialLink.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    iconName: IconName;
    url: string;
}

export const SocialLink: React.SFC<Props> = ({
    style,
    className,
    iconName,
    url
}) => (
    <li className={[styles.item, className].join(" ")} style={style}>
        <a href={url} rel="nofollow noreferer" title={iconName}>
            <FontAwesomeIcon icon={["fab", iconName]} />
        </a>
    </li>
);
export default SocialLink;
