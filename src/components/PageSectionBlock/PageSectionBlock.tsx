import * as React from "react";

import { PageSection } from "../../types/data";
import { Block } from "../Block";
import { Image } from "../Image";
import { SuccessStoryBlock } from "../SuccessStoryBlock";
import { TestimonialBlock } from "../TestimonialBlock";
import * as styles from "./PageSectionBlock.scss";
interface Props {
    section: PageSection;
    alternate?: boolean;
}

export const PageSectionBlock: React.SFC<Props> = ({ section, alternate }) => (
    <>
        <Block>
            <div className={alternate ? styles.alternateBlock : styles.block}>
                {section.image &&
                    !alternate && (
                        <Image
                            source={section.image}
                            className={styles.bigScreenImage}
                        />
                    )}

                <div>
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

                {section.image &&
                    alternate && (
                        <Image
                            source={section.image}
                            className={styles.bigScreenImage}
                        />
                    )}
            </div>
            {section.smallImage && (
                <Image
                    source={section.smallImage}
                    className={styles.smallScreenImage}
                />
            )}
        </Block>
        {section.testimonial && (
            // Testimonial
            <Block>
                <TestimonialBlock testimonial={section.testimonial} />
            </Block>
        )}
        {section.successStory && (
            <Block>
                <SuccessStoryBlock successStory={section.successStory} />
            </Block>
        )}
    </>
);
export default PageSectionBlock;
