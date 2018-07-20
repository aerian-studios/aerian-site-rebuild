import * as React from "react";

import * as styles from "./Card.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

interface State {
    visible: boolean;
}

export class Card extends React.PureComponent<Props> {
    public state = {
        visible: false
    };

    public setVisible = (visible: boolean) => this.setState({visible})

    public render() {
        return (
            <div
                className={[
                    styles.card,
                    this.props.className,
                    this.state.visible ? styles.visible : ""
                ].join(" ")}
                style={this.props.style}
            >
                <div className={styles.flip}>{this.props.children}</div>
            </div>
        );
    }
}
export default Card;
