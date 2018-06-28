import { Link } from "gatsby";
import * as React from "react";

import { PageListNode } from "../../types/data";
import * as styles from "./MainNavigation.scss";

interface Props {
    activeClassName?: string;
    activePath?: string;
    activeStyle?: React.CSSProperties;
    className?: string;
    pages: PageListNode[];
    style?: React.CSSProperties;
}

const makePageLink = (
    id: string,
    path: string,
    title: string,
    activeClassName?: string,
    activeStyle?: React.CSSProperties
) => {
    return (
        path && (
            <Link
                className="menu-item"
                activeClassName={["active-path", activeClassName].join(" ")}
                activeStyle={activeStyle}
                to={path}
                key={`menu-${id}`}
            >
                <span className="menu-item-content">{title}</span>
            </Link>
        )
    );
};

const constructPages = (
    pages: PageListNode[],
    activeClassName?: string,
    activeStyle?: React.CSSProperties
) => {
    return pages.map((page: PageListNode) => {
        const { id, path, title } = page.node;

        return makePageLink(id, path, title, activeClassName, activeStyle);
    });
};

export const MainNavigation: React.SFC<Props> = props => {
    const {
        style,
        className,
        pages,
        activePath,
        activeClassName,
        activeStyle
    } = props;

    return (
        <nav
            id="menu-main"
            className={[styles.component, className].join(" ")}
            style={style}
        >
            {pages ? constructPages(pages, activeClassName, activeStyle) : null}
        </nav>
    );
};
export default MainNavigation;
