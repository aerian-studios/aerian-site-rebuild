import Img, { GatsbyImageProps } from "gatsby-image";
import * as React from "react";
import { isImageSharp } from "../../lib/helpers";
import { ImageField } from "../../types/data";
import * as styles from "./Image.scss";

interface MyProps {
    source: ImageField;
}

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

type Props = MyProps & GatsbyImageProps & ImgProps;

export const Image: React.SFC<Props> = ({ source, ...props }) => {
    if (!source) {
        return null;
    }
    if (!isImageSharp(source)) {
        const imgProps = props as ImgProps;
        return <img src={source} {...imgProps} />;
    }
    const sharpProps = props as GatsbyImageProps;
    if (source.childImageSharp.fixed) {
        return <Img fixed={source.childImageSharp.fixed} {...sharpProps} />;
    }
    return <Img fluid={source.childImageSharp.fluid} {...sharpProps} />;
};
export default Image;
