import * as React from "react";

import * as styles from "./ContactInfo.scss";

interface Props {
    title: string;
    style?: React.CSSProperties;
    className?: string;
}

export const ContactInfo: React.SFC<Props> = ({ title, style, className }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h2>{title}</h2>
    </div>
);
export default ContactInfo;
