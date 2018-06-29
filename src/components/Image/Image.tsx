import Img from "gatsby-image";
import * as React from "react";

import { isImageSharp } from "../../lib/helpers";
import { ImageField } from "../../types/data";
import * as styles from "./Image.scss";

interface Props {
    source: ImageField;
}

export const Image: React.SFC<Props> = ({ source, ...props }) => {
    if (!source) {
        return null;
    }
    if (!isImageSharp(source)) {
        return <img src={source} {...props} />;
    }
    if (source.childImageSharp.fixed) {
        return <Img fixed={source.childImageSharp.fixed} {...props} />;
    }
    return <Img fluid={source.childImageSharp.fluid} {...props} />;
};
export default Image;
