import Img, { GatsbyImageProps } from "gatsby-image";
import * as React from "react";

import { isImageSharp } from "../../lib/helpers";
import { ImageField, ImageSharp } from "../../types/data";
import * as styles from "./Image.scss";

interface MySharpProps {
    source: ImageSharp;
}

interface MyStringProps {
    source: string;
}

type ImgProps = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>;

type SharpProps = MySharpProps & GatsbyImageProps;
type StringProps = MyStringProps & ImgProps;

type Props = SharpProps | StringProps;

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
