import * as React from "react";

import * as styles from "./ClientLogo.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    imgSrc: string;
    imgAlt: string;
}

export const ClientLogo: React.SFC<Props> = ({ style, className, imgSrc, imgAlt }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <figure className={styles.figure}>
            <img src={imgSrc} alt={imgAlt} className={styles.imgResponsive} />
        </figure>
    </div>
);
export default ClientLogo;
