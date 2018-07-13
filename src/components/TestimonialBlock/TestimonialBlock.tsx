import * as React from "react";
import Markdown from "react-markdown";
import { ImageField, Testimonial } from "../../types/data";
import { Image } from "./../Image";
import * as styles from "./TestimonialBlock.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    testimonial: Testimonial
}

function showImage(image?: ImageField) {
    return(
        image ? <Image source={image} /> : null
    )
}

export const TestimonialBlock: React.SFC<Props> = ({ children, style, className, testimonial }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {showImage(testimonial.image)}
        <blockquote className={styles.quote}>
            <div className={styles.testimonialText}>
                {testimonial.quote}
            </div>
            <footer>
                <figure className={styles.blockquoteImage}>
                    {showImage(testimonial.avatar)}
                </figure>
                <span className={styles.nameTitle}>
                    <span className={styles.name}>{testimonial.person}</span>
                    <span className={styles.title}>{testimonial.title}</span>
                </span>
            </footer>
        </blockquote>
    </div>
);
export default TestimonialBlock;
