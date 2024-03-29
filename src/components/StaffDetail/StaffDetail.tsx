import classNames from "classnames";
import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    memoizeCurrentScrollPos,
    scrollToElement,
    setTopMargin
} from "../../lib/scrollIntoView";

import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Staff } from "../../types/data";
import { Image } from "../Image";
import { Tag } from "../Tag";
import * as styles from "./StaffDetail.module.scss";

interface Props {
    staff: Staff;
    style?: React.CSSProperties;
    className?: string;
    onClose?: () => void;
}

export const getHeights = async (
    children: HTMLCollection
): Promise<number[]> => {
    const heights = [];
    const len = children.length;

    for (let i = 0; i < len; i++) {
        if (children[i].tagName !== "BUTTON") {
            heights.push(children[i].clientHeight);
        }
    }

    return heights;
};

export const showStyles = `visibility: visible; transition: all .3s ease-out 0s; position: relative; height: 0;`;
export const hideStyles = `height: initial; visibility: hidden; transition: none 0s linear 0s; position: absolute;`;
export const hideShow = async (
    el: HTMLElement,
    hide: boolean = true
): Promise<HTMLElement> => {
    if (hide) {
        el.style.cssText = hideStyles;
        return el;
    }
    el.style.cssText = showStyles;
    return el;
};

export const setHeightStyles = (
    el: HTMLElement | null | undefined,
    height: number
): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
        if (!el || typeof height === "undefined") {
            return reject(el);
        }
        // RAF didn't cut it - render failed to transition
        window.setTimeout(() => {
            if (!el || !el.style) {
                return reject(el);
            }

            el.style.height = `${height}px`;
            el.style.opacity = `1`;
            return resolve(el);
        }, 16);
    });
};

export const getAppropriateHeights = (heights: number[]): number => {
    const isVertical = window.innerWidth <= 768;

    return isVertical
        ? heights.reduce((accum, curr) => {
              return accum + curr;
          }, 0)
        : heights.reduce((accum, curr) => {
              return Math.max(curr, accum);
          }, 0);
};

export const setHeight = async (asideEl: HTMLElement): Promise<HTMLElement> => {
    const asideChildren: HTMLCollection = asideEl.children;

    await hideShow(asideEl, true);

    const heights: number[] = await getHeights(asideChildren);
    const desiredHeight = 160 + getAppropriateHeights(heights);

    await hideShow(asideEl, false);

    return setHeightStyles(asideEl, desiredHeight);
};

export class StaffDetail extends React.Component<Props> {
    public aside?: HTMLElement;

    public setAsideRef = (ref: HTMLElement | null) => {
        if (!ref) {
            return;
        }
        this.aside = ref;
        setHeight(ref);
        memoizeCurrentScrollPos();
        setTopMargin(80);
        window.setTimeout(() => {
            scrollToElement(ref);
        }, 300);
    };

    public closeAside = () => {
        if (this.aside) {
            hideShow(this.aside, false);
            scrollToElement(undefined, 150);
        }
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    public render() {
        const { staff, className, style } = this.props;
        return (
            <aside
                className={classNames(styles.component, className)}
                style={style}
                ref={this.setAsideRef}
            >
                <button
                    className={styles.closeButton}
                    onClick={this.closeAside}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <figure className={styles.funny}>
                    <Image
                        source={staff.imageFunny}
                        alt={`${staff.name} photo`}
                    />
                </figure>

                <div className={styles.details}>
                    <p className={styles.role}>{staff.jobTitle}</p>
                    <h2>{staff.name}</h2>
                    <p>{staff.description}</p>

                    <h3>Core skillset</h3>
                    <ul className={styles.skils}>
                        {staff.skills.map(skill => (
                            <Tag key={skill} value={skill} />
                        ))}
                    </ul>

                    <h3>Did you know</h3>
                    <p>{staff.fact}</p>
                </div>
            </aside>
        );
    }
}
export default StaffDetail;
