import classNames from "classnames";
import * as React from "react";
import * as styles from "./RevealCard.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

interface State {
    visible: boolean;
    seen: boolean;
}

export class RevealCard extends React.PureComponent<Props> {
    public state = {
        visible: false,
        seen: false
    };

    public setVisible = (visible: boolean) =>
        this.setState({
            visible,
            seen: visible || this.state.seen
        });

    public render() {
        return (
            <div
                className={classNames(
                    styles.revealCard,
                    this.props.className,
                    this.state.visible ? styles.visible : "",
                    this.state.seen ? styles.seen : "fade"
                )}
                style={this.props.style}
            >
                <div className={styles.flip}>{this.props.children}</div>
            </div>
        );
    }
}
export default RevealCard;
