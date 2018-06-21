import * as React from "react";
import { Link } from "react-router-dom";

import * as styles from "./MainNavigation.scss";
import { PagesListData, PageList, PageListNode } from "../../types/data";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    pages: PagesListData["data"];
    activePath: string;
}

const makePageLink = (
    id: string,
    path: string,
    title: string,
    activePath: string
) => (
    <Link to={path} key={`menu-${id}`}>
        <span className={activePath === path ? styles.activePath : ""}>
            {title}
        </span>
    </Link>
);

const constructPages = (pageList: PageList["edges"], activePath: string) => {
    return pageList.map((page: PageListNode) => {
        const { id, path, title } = page.node;
        console.log(activePath, path);
        return makePageLink(id, path, title, activePath);
    });
};

export const MainNavigation: React.SFC<Props> = props => {
    const { style, className, pages, activePath } = props;
    const pageList: PageList["edges"] =
        pages && pages.allPagesJson && pages.allPagesJson.edges;

    return (
        <nav
            id="menu-main"
            className={[styles.component, className].join(" ")}
            style={style}
        >
            {pages ? constructPages(pageList, activePath) : null}
        </nav>
    );
};
export default MainNavigation;
