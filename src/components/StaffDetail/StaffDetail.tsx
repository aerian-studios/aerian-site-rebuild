import * as React from "react";

import { Staff } from "../../types/data";
import { Image } from "../Image";
import { Tag } from "../Tag";
import * as styles from "./StaffDetail.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    staff: Staff;
}

export const StaffDetail: React.SFC<Props> = ({ style, className, staff }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <figure className={styles.funny}>
            <Image source={staff.imageFunny} alt={staff.name + " photo"} />
        </figure>

        <div className={styles.details}>
            <p className={styles.role}>{staff.jobTitle}</p>
            <h2>{staff.name}</h2>
            <p>{staff.description}</p>

            <h3>Core skillset</h3>
            <ul className={styles.skils}>
                {staff.skills.map(skill => <Tag key={skill} value={skill} />)}
            </ul>

            <h3>Did you know</h3>
            <p>{staff.fact}</p>
        </div>
    </div>
);
export default StaffDetail;
