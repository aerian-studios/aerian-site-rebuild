import Observer from "@researchgate/react-intersection-observer";
import * as React from "react";
import { Card } from "../Card";
import * as styles from "./ShowcaseCarousel.scss";
interface Props {
    style?: React.CSSProperties;
    className?: string;
    feature?: boolean;
    children: Array<React.ReactElement<any>>;
}
interface State {
    myStateValue?: boolean;
}

const INITIAL_STATE: State = {
    myStateValue: true
};

export class ShowcaseCarousel extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;
    public elements = new Map();

    public renderItem = (index: number, ref: () => void) => (
        <Card key={index} ref={ref}>
            {this.props.children[index]}
        </Card>
    );

    public handleChange = (ev: IntersectionObserverEntry, index: number) => {
        const element = this.elements.get(index);
        if (element) {
            element.setVisible(ev.isIntersecting);
        }
    };

    public render() {
        return (
            <div
                className={[
                    styles.component,
                    this.props.className,
                    this.props.feature && styles.feature
                ].join(" ")}
                style={this.props.style}
            >
                {this.props.children.map((el, index) => (
                    <Observer
                        key={index}
                        onChange={ev => this.handleChange(ev, index)}
                    >
                        <Card ref={ref => this.elements.set(index, ref)}>
                            {el}
                        </Card>
                    </Observer>
                ))}
            </div>
        );
    }
}
export default ShowcaseCarousel;
