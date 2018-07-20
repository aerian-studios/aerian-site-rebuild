import * as React from "react";

import classNames from "classnames";
import { Infographic } from "../../types/data";
import { Image } from "../Image";
import * as styles from "./VerticalInfographic.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    infographic: Infographic;
}

interface State {
    visibleImages: number;
}

export class VerticalInfographic extends React.Component<Props, State> {
    public type = {
        Vertical: "vertical",
        Horizontal: "horizontal",
        Bar: "bar",
        Split: "split"
    };

    public state: State = {
        visibleImages: 0
    };

    public timer?: number;

    public componentDidMount() {
        this.timer = window.setInterval(this.increment, 100);
    }

    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public increment = () => {
        if (this.state.visibleImages === this.props.infographic.imageCount) {
            clearInterval(this.timer);
            return;
        }
        this.setState({
            visibleImages: this.state.visibleImages + 1
        });
    };

    public renderImages(count: number, image: any) {
        const images = [];
        for (let i = 0; i < count; i++) {
            let output = styles.infoGraphicHidden;
            if (this.state.visibleImages > i) {
                output = styles.infoGraphicShown;
            }
            images.push(
                <figure key={i} className={styles.infographicImage}>
                    <Image className={output} source={image} alt="icon" />
                </figure>
            );
        }
        return images;
    }

    public render() {
        return (
            <div
                className={classNames(
                    styles.component,
                    this.props.className,
                    styles[this.type[this.props.infographic.type]]
                )}
                style={this.props.style}
            >
                <div className={styles.infographicPrimary}>
                    <div className={styles.infographicCount}>
                        {this.props.infographic.primaryText}
                    </div>
                    <div className={styles.infographicSecondary}>
                        {this.props.infographic.secondaryText}
                    </div>
                </div>

                <div className={styles.infographicGraphics}>
                    {this.renderImages(
                        this.props.infographic.imageCount,
                        this.props.infographic.image
                    )}
                </div>
            </div>
        );
    }
}
export default VerticalInfographic;
