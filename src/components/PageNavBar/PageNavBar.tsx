import * as React from "react";

import * as styles from "./PageNavBar.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}
interface State {
    myStateValue?: boolean;
}

const INITIAL_STATE: State = {
    myStateValue: true
};

export class PageNavBar extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;

    public render() {
        return (
            <header
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
            >
                {this.props.children}
            </header>
        );
    }
}
export default PageNavBar;