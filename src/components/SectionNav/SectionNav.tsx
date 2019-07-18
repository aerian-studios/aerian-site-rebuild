import classNames from "classnames";
import * as React from "react";

interface Props {
    keyConsts: { [key: string]: string };
    style?: React.CSSProperties;
    className?: string;
    onNavigation: (itemKey: string) => void;
    navItemClassName?: string;
    navWrapperClassName?: string;
}

const wrapNavItem = (
    content: string,
    itemKey: string,
    onNavigation: (itemKey: string) => void,
    navItemClassName?: string
) => (
    <a
        className={navItemClassName}
        href={`#${itemKey}`}
        key={`sectionnav-${itemKey}`}
        onClick={() => {
            onNavigation(itemKey);
        }}
    >
        {content}
    </a>
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
    navItemClassName,
    navWrapperClassName
}) => (
    <nav className={classNames(className)} style={style}>
        <div className={classNames(navWrapperClassName)}>
            {createNavItems(keyConsts, onNavigation, navItemClassName)}
        </div>
    </nav>
);
export default SectionNav;
