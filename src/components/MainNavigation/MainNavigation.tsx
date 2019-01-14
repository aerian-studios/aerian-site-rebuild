import { Link } from "gatsby";
import * as React from "react";

import { PageListNode } from "../../types/data";
import * as styles from "./MainNavigation.module.scss";

interface Props {
    activeLinkClassName?: string;
    className?: string;
    activePath?: string;
    linkClassName?: string;
    pages: PageListNode[];
    style?: React.CSSProperties;
    onClick?: () => void;
}

const makePageLink = (
    id: string,
    path: string,
    title: string,
    linkClassName?: string,
    activeLinkClassName?: string,
    activeLinkStyle?: React.CSSProperties
) => {
    return (
        path && (
            <Link
                className={["menu-item", linkClassName].join(" ")}
                activeClassName={["active-path", activeLinkClassName].join(" ")}
                style={activeLinkStyle}
                to={path}
                key={`menu-${id}`}
            >
                <span
                    className={["menu-item", styles.menuItemContent].join(" ")}
                >
                    {title}
                </span>
            </Link>
        )
    );
};

const constructPages = (
    pages: PageListNode[],
    activeLinkClassName?: string,
    linkClassName?: string
) => {
    return pages.map((page: PageListNode) => {
        const { id, path, title } = page.node;

        return makePageLink(
            id,
            path,
            title,
            linkClassName,
            activeLinkClassName
        );
    });
};

export const MainNavigation: React.SFC<Props> = props => {
    const {
        style,
        className,
        pages,
        activeLinkClassName,
        linkClassName,
        onClick
    } = props;

    return (
        <nav
            id="menu-main"
            className={[styles.component, className].join(" ")}
            style={style}
            onClick={onClick}
        >
            {pages
                ? constructPages(pages, activeLinkClassName, linkClassName)
                : null}
        </nav>
    );
};
export default MainNavigation;
