import * as React from "react";

import { Staff } from "../../types/data";
import * as styles from "./StaffGridItem.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    person: Staff;
}

export const StaffGridItem: React.SFC<Props> = ({
    style,
    className,
    person
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {JSON.stringify(person)}
    </div>
);
export default StaffGridItem;
