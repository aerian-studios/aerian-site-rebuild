import * as React from "react";

import * as styles from "./VerticalInfographic.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    title: string;
    image: string;
    count: number;
}

interface State {
    visibleImages: number;
}

export class VerticalInfographic extends React.Component<Props, State> {
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
        if (this.state.visibleImages === this.props.count) {
            clearInterval(this.timer);
            return;
        }
        this.setState({
            visibleImages: this.state.visibleImages + 1
        });
    };

    public renderImages(count: number, image: string) {
        const images = [];
        for (let i = 0; i < count; i++) {
            let output = styles.infoGraphicHidden;
            if (this.state.visibleImages > i) {
                output = styles.infoGraphicShown;
            }
            images.push(
                <figure key={i} className={styles.infographicImage}>
                    <img key={i} className={output} src={image} alt="icon" />
                </figure>
            );
        }
        return images;
    }

    public render() {
        return (
            <div
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
            >
                <div className={styles.infographicCount}>
                    {this.props.count}X
                    <span className={styles.infographicTitle}>
                        {this.props.title}
                    </span>
                </div>
                {this.renderImages(this.props.count, this.props.image)}
            </div>
        );
    }
}
export default VerticalInfographic;
