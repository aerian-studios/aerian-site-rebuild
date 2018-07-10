import { Link } from "gatsby";
import * as React from "react";
import { Client } from "../../types/data";
import { ClientLogo } from "../ClientLogo";
import { Image } from "../Image";
import * as styles from "./ClientGridItem.scss";
interface Props {
    client: Client;
    style?: React.CSSProperties;
    className?: string;
}

export const ClientGridItem: React.SFC<Props> = ({
    client,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {client.featuredProject ? (
            <Link to={`/our-work/project/${client.featuredProject}`}>
                <ClientLogo client={client} className={styles.figure} />
            </Link>
        ) : (
            <ClientLogo client={client} className={styles.figure} />
        )}
    </div>
);
export default ClientGridItem;
