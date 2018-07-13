import * as React from "react";
import { Client } from "../../types/data";
import { Image } from "../Image";
import * as styles from "./ClientLogo.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    client: Client;
}

export const ClientLogo: React.SFC<Props> = ({ style, className, client }) => (
    <figure className={[styles.component, className].join(" ")} style={style}>
        <Image source={client.logo} alt={client.name} />
    </figure>
);
export default ClientLogo;
