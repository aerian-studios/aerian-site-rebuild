import classNames from "classnames/bind";
import * as React from "react";

import { Link } from "gatsby";
import { PageSection } from "../../types/data";
import * as styles from "./SectionNav.scss";

const cx = classNames.bind(styles);

interface Props {
    keyConsts: { [key: string]: string };
    style?: React.CSSProperties;
    className?: string;
    onNavigation: (itemKey: string) => void;
    navItemClassName?: string;
}

const wrapNavItem = (
    content: string,
    itemKey: string,
    onNavigation: (itemKey: string) => void,
    navItemClassName?: string
) => (
    <Link
        className={cx(styles.sectionNavItem, navItemClassName)}
        to={`#${itemKey}`}
        key={`sectionnav-${itemKey}`}
        onClick={() => {
            onNavigation(itemKey);
        }}
    >
        {content}
    </Link>
);

const getKeyWrapper = (
    keyConsts: { [key: string]: string },
    onNavigation: (itemKey: string) => void,
    navItemClassName?: string
) => (itemKey: string) => {
    return wrapNavItem(
        keyConsts[itemKey],
        itemKey,
        onNavigation,
        navItemClassName
    );
};

const createNavItems = (
    keyConsts: { [key: string]: string },
    onNavigation: (itemKey: string) => void,
    navItemClassName?: string
): Array<React.ReactElement<HTMLAnchorElement>> => {
    const nav = [];
    const navItemWrapper = getKeyWrapper(
        keyConsts,
        onNavigation,
        navItemClassName
    );

    for (const navItemKey in keyConsts) {
        if (keyConsts.hasOwnProperty(navItemKey)) {
            nav.push(navItemWrapper(navItemKey));
        }
    }

    return nav;
};

export const SectionNav: React.SFC<Props> = ({
    keyConsts,
    style,
    className,
    onNavigation,
    navItemClassName
}) => (
    <nav className={cx(styles.component, className)} style={style}>
        {createNavItems(keyConsts, onNavigation, navItemClassName)}
    </nav>
);
export default SectionNav;
