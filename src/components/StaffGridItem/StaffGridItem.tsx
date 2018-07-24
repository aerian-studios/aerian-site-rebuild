import * as React from "react";

import { Staff } from "../../types/data";
import { Image } from "../Image";
import { StaffDetail } from "../StaffDetail";
import * as styles from "./StaffGridItem.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    person: Staff;
    detail?: boolean;
    onExpand: (person?: Staff) => void;
}

export const StaffGridItem: React.SFC<Props> = ({
    style,
    className,
    person,
    detail,
    onExpand
}) => (
    <>
        <div
            className={[styles.component, className].join(" ")}
            style={style}
            onClick={() => onExpand(detail ? undefined : person)}
        >
            <Image source={person.imageNormal} />
        </div>
        {detail && <StaffDetail staff={person} />}
    </>
);
export default StaffGridItem;
