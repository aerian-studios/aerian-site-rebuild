import classNames from "classnames";
import { Link } from "gatsby";
import * as React from "react";

import { PageListNode } from "../../types/data";
import { MainNavigation } from "../MainNavigation";

import logo from "../../../static/assets/furniture/aerian-logo.svg";
import * as styles from "./PageNavBar.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    pages: PageListNode[];
    activePath: string;
}
interface State {
    visible: boolean;
}

const INITIAL_STATE: State = {
    visible: false
};

export class PageNavBar extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;
    public navClick = () => {
        this.setState({ visible: !this.state.visible });
    };

    public render() {
        const mainNavClasses = [styles.nav];
        if (this.state.visible) {
            mainNavClasses.push(styles.navActive);
        }
        return (
            <header
                className={classNames(styles.component, this.props.className)}
                style={this.props.style}
            >
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Aerian" />
                    </Link>
                </div>
                {this.props.children}
                <MainNavigation
                    pages={this.props.pages}
                    className={mainNavClasses.join(" ")}
                    activePath={this.props.activePath}
                    activeLinkClassName={styles.activeLink}
                    linkClassName={styles.link}
                    onClick={() => {
                        this.navClick();
                    }}
                />
            </header>
        );
    }
}
export default PageNavBar;
