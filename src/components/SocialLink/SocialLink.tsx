import * as React from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from "./SocialLink.scss";

library.add(fab);

interface Props {
    style?: React.CSSProperties;
    className?: string;
    iconName: IconProp;
    url: string;
}

export const SocialLink: React.SFC<Props> = ({
    style,
    className,
    iconName,
    url
}) => (
    <li className={[styles.item, className].join(" ")} style={style}>
        <a href={url}>
            <FontAwesomeIcon icon={iconName} />
        </a>
    </li>
);
export default SocialLink;
