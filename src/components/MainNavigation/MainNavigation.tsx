import { Link } from "gatsby";
import * as React from "react";

import { PageListNode } from "../../types/data";
import * as styles from "./MainNavigation.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    pages: PageListNode[];
    activePath: string;
}

const makePageLink = (
    id: string,
    path: string,
    title: string,
    activePath: string
) => {
    const classes = `menu-item${activePath === path && " active-path"}`;

    return (
        path && (
            <Link className={classes} to={path} key={`menu-${id}`}>
                <span className="menu-item-content">{title}</span>
            </Link>
        )
    );
};

const constructPages = (pages: PageListNode[], activePath: string) => {
    return pages.map((page: PageListNode) => {
        const { id, path, title } = page.node;

        return makePageLink(id, path, title, activePath);
    });
};

export const MainNavigation: React.SFC<Props> = props => {
    const { style, className, pages, activePath } = props;

    return (
        <nav
            id="menu-main"
            className={[styles.component, className].join(" ")}
            style={style}
        >
            {pages ? constructPages(pages, activePath) : null}
        </nav>
    );
};
export default MainNavigation;
