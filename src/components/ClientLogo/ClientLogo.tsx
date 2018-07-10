import * as React from "react";
import { Image } from "../Image";
import * as styles from "./ClientLogo.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    imgSrc: string;
    imgAlt: string;
}

export const ClientLogo: React.SFC<Props> = ({
    style,
    className,
    imgSrc,
    imgAlt
}) => (
    <figure className={[styles.component, className].join(" ")} style={style}>
        <Image source={imgSrc} alt={imgAlt} className={styles.imgResponsive} />
    </figure>
);
export default ClientLogo;
