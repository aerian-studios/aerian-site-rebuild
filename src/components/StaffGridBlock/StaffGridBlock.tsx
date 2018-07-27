import * as React from "react";

import { Staff } from "../../types/data";
import { StaffGridItem } from "../StaffGridItem";
import * as styles from "./StaffGridBlock.module.scss";

interface Props {
    staff: Staff[];
    style?: React.CSSProperties;
    className?: string;
}

interface State {
    selectedItem: number;
}

export class StaffGridBlock extends React.PureComponent<Props, State> {
    public state = {
        selectedItem: -1
    };

    public expandDetail = (person?: Staff) => {
        if (!person) {
            this.setState({ selectedItem: -1 });
            return;
        }
        this.setState({ selectedItem: this.props.staff.indexOf(person) });
    };

    public render() {
        const { staff, style, className } = this.props;
        return (
            <div
                className={[styles.component, className].join(" ")}
                style={style}
            >
                {staff.map((person, i) => (
                    <StaffGridItem
                        key={person.name}
                        person={person}
                        detail={this.state.selectedItem === i}
                        onExpand={this.expandDetail}
                        index={i}
                    />
                ))}
            </div>
        );
    }
}
export default StaffGridBlock;
