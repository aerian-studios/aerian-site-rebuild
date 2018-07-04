import { Link } from "gatsby";
import * as React from "react";
import { Client } from "../../types/data";
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
        {client.featuredProject && (
            <Link to={`/our-work/project/${client.featuredProject}`}>
                Project
            </Link>
        )}
        <Image source={client.logo} />
    </div>
);
export default ClientGridItem;
