import * as React from "react";

import { PageListNode, PagesListData } from "../../types/data";
import { MainNavigation } from "../MainNavigation/";
import * as styles from "./PageNavBar.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    pages: PageListNode[];
    activePath: string;
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
                <MainNavigation
                    pages={this.props.pages}
                    activePath={this.props.activePath}
                />
            </header>
        );
    }
}
export default PageNavBar;
