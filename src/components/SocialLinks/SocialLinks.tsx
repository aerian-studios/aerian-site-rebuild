import * as React from "react";

import * as styles from "./SocialLinks.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const SocialLinks: React.SFC<Props> = ({
    children,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {children}
    </div>
);
export default SocialLinks;
