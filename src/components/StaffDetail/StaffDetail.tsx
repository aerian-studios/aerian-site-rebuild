import classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    momoizeCurrentScrollPos,
    scrollToElement,
    setTopMargin
} from "../../lib/scrollIntoView";

import { Staff } from "../../types/data";
import { Image } from "../Image";
import { Tag } from "../Tag";
import * as styles from "./StaffDetail.module.scss";

interface Props {
    staff: Staff;
    style?: React.CSSProperties;
    className?: string;
    onClose: () => void;
}

const xIcon: IconName = "times";

const getHeights = async (children: HTMLCollection): Promise<number[]> => {
    const heights = [];
    const len = children.length;

    for (let i = 0; i < len; i++) {
        if (children[i].tagName !== "BUTTON") {
            heights.push(children[i].clientHeight);
        }
    }

    return heights;
};

const showStyles = `visibility: visible; transition: all .3s ease-out 0s; position: relative; height: 0;`;
const hideStyles = `height: initial; visibility: hidden; transition: none 0s linear 0s; position: absolute;`;
const hideShow = async (
    el: HTMLElement,
    hide: boolean = true
): Promise<string> => {
    if (hide) {
        return (el.style.cssText = hideStyles);
    }
    return (el.style.cssText = showStyles);
};

const setHeight = async (asideEl: HTMLElement) => {
    const asideChildren: HTMLCollection = asideEl.children;
    const isVertical = window.innerWidth <= 768;

    await hideShow(asideEl, true);

    const heights: number[] = await getHeights(asideChildren);
    const desiredHeight =
        160 +
        (isVertical
            ? heights.reduce((accum, curr) => {
                  return accum + curr;
              }, 0)
            : heights.reduce((accum, curr) => {
                  return Math.max(curr, accum);
              }, 0));

    await hideShow(asideEl, false);

    // RAF didn't cut it - render failed to transition
    window.setTimeout(() => {
        asideEl.style.height = `${desiredHeight}px`;
        asideEl.style.opacity = `1`;
    }, 16);
};

export class StaffDetail extends React.Component<Props> {
    public asideRef: React.RefObject<HTMLElement>;
    constructor(props: Props) {
        super(props);

        this.asideRef = React.createRef();
    }
    public componentDidMount() {
        const asideEl = ReactDOM.findDOMNode(this.asideRef.current);
        setHeight(asideEl);
        momoizeCurrentScrollPos();
        setTopMargin(80);
        window.setTimeout(() => {
            scrollToElement(asideEl);
        }, 300);
    }
    public render() {
        const { staff, className, style, onClose } = this.props;
        return (
            <aside
                className={classNames(styles.component, className)}
                style={style}
                ref={this.asideRef}
            >
                <button
                    onClick={() => {
                        const asideEl = ReactDOM.findDOMNode(
                            this.asideRef.current
                        );
                        hideShow(asideEl, false);
                        scrollToElement(undefined, 150);
                        onClose();
                    }}
                    className={styles.closeButton}
                >
                    <FontAwesomeIcon icon={xIcon} />
                </button>
                <figure className={styles.funny}>
                    <Image
                        source={staff.imageFunny}
                        alt={staff.name + " photo"}
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
