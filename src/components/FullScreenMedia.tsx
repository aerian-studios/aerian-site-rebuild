import Img from "gatsby-image";
import * as React from "react";

import { ImageSharpSizes } from "../types/data";

import { isImageSharpSizes } from "../lib/helpers";
import { Omit } from "../types/helpers";
import "./FullScreenMedia.scss";

interface Props {
    image?: ImageSharpSizes | string;
    altText?: string;
    video?: string;
    wrapperClassName?: string;
}

const getMedia = ({
    video,
    image,
    altText
}: Omit<Props, { wrapperClassName: string }>) => {
    if (video) {
        const poster = image && isImageSharpSizes(image) ? image.src : image;
        return (
            <video
                preload="auto"
                className="media-video"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                poster={poster}
            >
                <source src={video} type="video/mp4" />
            </video>
        );
    }

    if (!image) {
        return;
    }

    if (isImageSharpSizes(image)) {
        return <Img sizes={image} alt={altText} />;
    }
    return <img src={image} alt={altText} />;
};

export const FullScreenMedia: React.SFC<Props> = ({
    wrapperClassName,
    ...props
}) => (
    <figure className={`full-screen ${wrapperClassName}`}>
        {getMedia(props)}
    </figure>
);
