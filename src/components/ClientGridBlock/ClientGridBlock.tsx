import * as React from "react";

import { Client } from "../../types/data";
import { ClientGridItem } from "../ClientGridItem";
import * as styles from "./ClientGridBlock.module.scss";

interface Props {
    clients: Client[];
    style?: React.CSSProperties;
    className?: string;
}

export const ClientGridBlock: React.SFC<Props> = ({
    clients,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {clients.map(client => (
            <ClientGridItem key={client.name} client={client} />
        ))}
    </div>
);
export default ClientGridBlock;
