import * as React from "react";

import * as styles from "./VerticalInfographic.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    title: string;
    image: string;
    count: number;
}

export const renderImages = (count, image) => {
    const images = [];
    for (let i = 0; i < count; i++) {
        images.push(<img key={i} src={image} alt="icon" />);
    }
    return images;
};

export const VerticalInfographic: React.SFC<Props> = ({
    style,
    className,
    title,
    image,
    count
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <p>{count}X</p>
        <p>{title}</p>
        {renderImages(count, image)}
    </div>
);
export default VerticalInfographic;
