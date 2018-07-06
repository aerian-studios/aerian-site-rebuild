import { Link } from "gatsby";
import * as React from "react";
import { Project } from "../../types/data";
import { Image } from "../Image";
import * as styles from "./ShowcaseCarousel.scss";
interface Props {
    projects: Project[];
    style?: React.CSSProperties;
    className?: string;
}
interface State {
    myStateValue?: boolean;
}

const INITIAL_STATE: State = {
    myStateValue: true
};

export class ShowcaseCarousel extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;

    public render() {
        return (
            // <marquee>
            <div
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
            >
                {this.props.projects.map(project => (
                    <Link to={`/our-work/${project.slug}`}>
                        <Image
                            key={project.titleLineOne}
                            source={project.heroImage}
                        />
                    </Link>
                ))}
            </div>
            // </marquee>
        );
    }
}
export default ShowcaseCarousel;
