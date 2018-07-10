import * as React from "react";
import { GalleryImage } from "../../types/data";
import { GroupFour } from "../GroupFour";
import { Image } from "../Image";
import * as styles from "./Gallery.scss";

interface Props {
    gallery: GalleryImage[];
    style?: React.CSSProperties;
    className?: string;
}

export const Gallery: React.SFC<Props> = ({ gallery, style, className }) => (
    <GroupFour className={className} style={style}>
        {gallery.map((image, i) => (
            <Image
                className={styles.image}
                source={image.image}
                alt={image.alt}
                key={i}
            />
        ))}
    </GroupFour>
);
export default Gallery;
