import * as React from "react";
import { Image } from "./../Image";
import * as styles from "./TestimonialBlock.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;

    mainImage: string;
  quoteIcon?: string; // todo if not passed then set a default
    testimonialText: string;
    reviewerAvatar: string;
    reviewerName: string;
    jobTitle: string;
}

function showMainImage(mainImage: string) {
    return(
        <div>
        {mainImage ?
                <Image source={mainImage} /> 
            : ""
        }
        </div>
    )
}

export const TestimonialBlock: React.SFC<Props> = ({ children, style, className, mainImage, quoteIcon, testimonialText, reviewerAvatar, reviewerName, jobTitle }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        {showMainImage(mainImage)}
        <blockquote className={styles.quote}>
            <div className={styles.testimonialText}>
                {testimonialText}
            </div>
            <footer>
                <figure className={styles.blockquoteImage}>
                    <Image source={mainImage} /> 
                </figure>
                <span className={styles.nameTitle}>
                    <span className={styles.name}>{reviewerName}</span>
                    <span className={styles.title}>{jobTitle}</span>
                </span>
            </footer>
        </blockquote>
    </div>
);
export default TestimonialBlock;
