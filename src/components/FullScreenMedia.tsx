import * as React from "react";
import Img from "gatsby-image";

import { ImageSharpSizes } from "../types/data";

import "./fullScreenMedia.scss";

interface Props {
    image?: ImageSharpSizes | string;
    altText?: string;
    video?: string;
    wrapperClassName?: string;
}

export const FullScreenMedia: React.SFC<Props> = ({
    image,
    altText,
    video,
    wrapperClassName
}) => (
    <figure className={`full-screen ${wrapperClassName}`}>
        {video ? (
            <video
                preload="auto"
                className="media-video"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                poster={image}
            >
                <source src={video} type="video/mp4" />
            </video>
        ) : (
            <Img sizes={image} alt={altText} />
        )}
    </figure>
);
