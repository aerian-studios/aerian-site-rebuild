import * as React from "react";

import { Staff } from "../../types/data";
import { StaffGridItem } from "../StaffGridItem";
import * as styles from "./StaffGridBlock.module.scss";

interface Props {
    staff: Staff[];
    style?: React.CSSProperties;
    className?: string;
}

export const StaffGridBlock: React.SFC<Props> = ({
    staff,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {staff.map(person => (
            <StaffGridItem key={person.name} person={person} />
        ))}
    </div>
);
export default StaffGridBlock;
