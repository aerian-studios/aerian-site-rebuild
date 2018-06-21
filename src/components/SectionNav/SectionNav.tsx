import * as React from "react";

import * as styles from "./SectionNav.scss";

interface Props {
    keyConsts: {};
    sections: any;
    style?: React.CSSProperties;
    className?: string;
    onNavigation: (itemKey: string) => void;
}

const wrapNavItem = (
    content: string,
    itemKey: string,
    onNavigation: Props["onNavigation"]
) => (
    <a
        className={styles.sectionNavItem}
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
    keyConsts: Props["keyConsts"],
    onNavigation: Props["onNavigation"]
) => (itemKey: string) => {
    return wrapNavItem(keyConsts[itemKey], itemKey, onNavigation);
};

const createNavItems = (
    sections: Props["sections"],
    keyConsts: Props["keyConsts"],
    onNavigation: Props["onNavigation"]
): React.ReactElement<HTMLAnchorElement>[] => {
    const nav = [];
    const navItemWrapper = getKeyWrapper(keyConsts, onNavigation);

    for (const itemKey in sections) {
        const entry = sections[itemKey];
        console.log(itemKey, keyConsts[itemKey]);

        switch (itemKey) {
            case "caseStudy":
                if (entry.title || entry.text) {
                    nav.push(navItemWrapper(itemKey));
                }
                break;
            case "gallery":
                if (typeof entry !== "undefined") {
                    nav.push(navItemWrapper(itemKey));
                }
                break;
            case "challenge":
                if (typeof entry !== "undefined") {
                    nav.push(navItemWrapper(itemKey));
                }
                break;
            case "solution":
                if (typeof entry !== "undefined") {
                    nav.push(navItemWrapper(itemKey));
                }
                break;
            case "results":
                if (typeof entry !== "undefined") {
                    nav.push(navItemWrapper(itemKey));
                }
                break;
            default:
                break;
        }
    }

    return nav;
};

export const SectionNav: React.SFC<Props> = ({
    keyConsts,
    sections,
    style,
    className,
    onNavigation
}) => (
    <nav className={[styles.base, className].join(" ")} style={style}>
        {createNavItems(sections, keyConsts, onNavigation)}
    </nav>
);
export default SectionNav;
