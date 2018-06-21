import * as React from "react";
import { Link } from "react-router-dom";

import * as styles from "./MainNavigation.scss";
import { PagesListData, PageList, PageListNode } from "../../layouts";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    pages: PagesListData["data"];
}

const makePageLink = (id: string, path: string, title: string) => (
    <Link to={path} key={`menu-${id}`}>
        <span>{title}</span>
    </Link>
);

const constructPages = (pageList: PageList["edges"]) => {
    return pageList.map((page: PageListNode) => {
        const { id, path, title } = page.node;

        return makePageLink(id, path, title);
    });
};

export const MainNavigation: React.SFC<Props> = ({
    style,
    className,
    pages
}) => {
    const pageList: PageList["edges"] =
        pages && pages.allPagesJson && pages.allPagesJson.edges;

    return (
        <nav
            id="menu-main"
            className={[styles.component, className].join(" ")}
            style={style}
        >
            {pages ? constructPages(pageList) : null}
        </nav>
    );
};
export default MainNavigation;
