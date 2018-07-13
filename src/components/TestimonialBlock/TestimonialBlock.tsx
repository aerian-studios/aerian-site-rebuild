import * as React from "react";
import Markdown from "react-markdown";
import { ImageField, Testimonial } from "../../types/data";
import { Image } from "./../Image";
import * as styles from "./TestimonialBlock.scss";

import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    testimonial: Testimonial;
}

function showImage(image?: ImageField) {
    return image ? <Image source={image} /> : null;
}

export const TestimonialBlock: React.SFC<Props> = ({
    children,
    style,
    className,
    testimonial
}) => (
    <div
        className={[styles.component, className].join(" ")}
        style={style}
        itemProp="review"
        itemScope={true}
        itemType="http://schema.org/Review"
    >
        {showImage(testimonial.image)}
        <blockquote>
            <FontAwesomeIcon className={styles.quoteLeft} icon={faQuoteLeft} />
            <div className={styles.testimonialText} itemProp="reviewBody">
                {testimonial.quote}
            </div>
            <footer className={styles.testimonialFooter}>
                <figure className={styles.blockquoteImage}>
                    {showImage(testimonial.avatar)}
                </figure>
                <div>
                    <span className={styles.name} itemProp="author">
                        {testimonial.person}
                    </span>
                    <span className={styles.title} itemProp="name">
                        {testimonial.title}
                    </span>
                </div>
            </footer>
        </blockquote>
    </div>
);
export default TestimonialBlock;
