import * as React from "react";
import Img from "gatsby-image";

import { ImageSharpSizes } from "../types/data";

import "./fullScreenMedia.scss";

interface Props {
    image?: ImageSharpSizes;
    altText?: string | null;
    video?: string | null;
    wrapperClassName?: string | null;
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
            >
                <source src={video} type="video/mp4" />
            </video>
        ) : (
            <Img sizes={image} />
        )}
    </figure>
);
