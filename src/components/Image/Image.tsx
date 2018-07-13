import classNames from "classnames";
import Img, { GatsbyImageProps } from "gatsby-image";
import * as React from "react";
import { isFileNode, isImageSharp } from "../../lib/helpers";
import { ImageField } from "../../types/data";
import * as styles from "./Image.scss";
interface MyProps {
    source: ImageField;
}

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

type Props = MyProps & GatsbyImageProps & ImgProps;

const img = (src: string, props: ImgProps) => {
    const { className, ...rest } = props;
    return (
        <div className={classNames(styles.wrapper, className)}>
            <img className={styles.image} src={src} {...rest} />
        </div>
    );
};

export const Image: React.SFC<Props> = ({ source, ...props }) => {
    if (!source) {
        return null;
    }
    if (isImageSharp(source) && source.childImageSharp) {
        const sharpProps = props as GatsbyImageProps;
        if (source.childImageSharp.fixed) {
            return <Img fixed={source.childImageSharp.fixed} {...sharpProps} />;
        }
        if (source.childImageSharp.fluid) {
            return <Img fluid={source.childImageSharp.fluid} {...sharpProps} />;
        }
    }
    const imgProps = props as ImgProps;

    if (isFileNode(source) || isImageSharp(source)) {
        if (!source.publicURL) {
            return <div className={props.className} style={props.style} />;
        }
        return img(source.publicURL, imgProps);
    }
    if (typeof source !== "string") {
        return <p>{JSON.stringify(source)}</p>;
    }
    return img(source, imgProps);
};
export default Image;
