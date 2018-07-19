import * as React from "react";

import { getSrc } from "../lib/helpers";
import { ImageField } from "../types/data";
import { Omit } from "../types/helpers";
import "./FullScreenMedia.scss";
import { Image } from "./Image";

interface Props {
    image?: ImageField;
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
        const poster = getSrc(image);
        const vid = getSrc(video);
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
                <source src={vid} type="video/mp4" />
            </video>
        );
    }

    if (!image) {
        return;
    }
    return <Image source={image} alt={altText} />;
};

export const FullScreenMedia: React.SFC<Props> = ({
    wrapperClassName,
    ...props
}) => (
    <figure className={`full-screen ${wrapperClassName}`}>
        {getMedia(props)}
    </figure>
);
