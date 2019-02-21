import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import classNames from "classnames";
import * as React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialLink } from "../SocialLink";
import * as styles from "./SocialGridItem.module.scss";

interface Props {
    icon: IconDefinition;
    url: string;
    text: string;
    style?: React.CSSProperties;
    className?: string;
}

export const SocialGridItem: React.SFC<Props> = ({
    children,
    style,
    className,
    icon,
    url,
    text
}) => (
    <SocialLink
        icon={icon}
        url={url}
        className={classNames(className, styles.socialLink)}
        iconSize="5x"
    >
        <p aria-hidden="true">{text}</p>
        <span aria-hidden="true" className={styles.btn}>
            View page
            <FontAwesomeIcon icon={faArrowRight} size="xs" />
        </span>
    </SocialLink>
);
export default SocialGridItem;
