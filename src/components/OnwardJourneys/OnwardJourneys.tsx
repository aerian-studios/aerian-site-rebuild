import classNames from "classnames";
import * as React from "react";
import { LinkButton } from "../LinkButton";
import * as styles from "./OnwardJourneys.module.scss";

interface Props {
    projectURL: string;
    style?: React.CSSProperties;
    className?: string;
}

export const OnwardJourneys: React.SFC<Props> = ({
    projectURL,
    style,
    className
}) => (
    <div className={classNames(styles.component, className)} style={style}>
        <div className={classNames(styles.section, styles.firstSection)}>
            <div className={styles.sectionContent}>
                <h3 className={classNames("large-title", styles.largeTitle)}>
                    Like what you see?
                </h3>
                <LinkButton to="/our-work" alternate={true} arrow={true}>
                    View more work
                </LinkButton>
            </div>
        </div>
        <div className={classNames(styles.section, styles.secondSection)}>
            <div className={styles.sectionContent}>
                <h3 className={classNames("large-title", styles.largeTitle)}>
                    Got a project in mind?
                </h3>
                <LinkButton to="/contact-us" alternate={true} arrow={true}>
                    Contact us
                </LinkButton>
            </div>
        </div>
    </div>
);
export default OnwardJourneys;
