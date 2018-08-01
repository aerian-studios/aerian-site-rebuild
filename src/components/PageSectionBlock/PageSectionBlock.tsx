import * as React from "react";

import classNames from "classnames";
import { PageSection } from "../../types/data";
import { Block } from "../Block";
import { Image } from "../Image";
import { SuccessStoryBlock } from "../SuccessStoryBlock";
import { TestimonialBlock } from "../TestimonialBlock";
import * as styles from "./PageSectionBlock.module.scss";
interface Props {
    section: PageSection;
    alternate?: boolean;
}

export const PageSectionBlock: React.SFC<Props> = ({ section, alternate }) => (
    <>
        <Block key={`${section.title}_main`}>
            <div
                className={classNames([
                    styles.block,
                    { [styles.alternateBlock]: alternate }
                ])}
            >
                <div className={styles.body}>
                    <h2>{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                    <p>{section.blurb}</p>
                    {section.activities &&
                        section.activities.map(activity => (
                            <>
                                <h4 key={`title${activity.title}`}>
                                    {activity.title}
                                </h4>
                                <p key={`text${activity.title}`}>
                                    {activity.text}
                                </p>
                            </>
                        ))}
                </div>

                {section.image && (
                    <figure className={styles.bigScreenImage}>
                        <Image source={section.image} />
                    </figure>
                )}
                {section.smallImage && (
                    <figure className={styles.smallScreenImage}>
                        <Image source={section.smallImage} />
                    </figure>
                )}
            </div>
        </Block>
        {section.testimonial && (
            <Block alternate={true}>
                <TestimonialBlock testimonial={section.testimonial} />
            </Block>
        )}
        {section.successStory && (
            <Block key={`${section.title}_success`} alternate={true}>
                <SuccessStoryBlock successStory={section.successStory} />
            </Block>
        )}
    </>
);
export default PageSectionBlock;
