import Observer from "@researchgate/react-intersection-observer";
import { Link } from "gatsby";
import * as React from "react";
import { NodeList, ProjectBox } from "../../types/data";
import { Button } from "../Button";
import { Image } from "../Image";
import { RevealCard } from "../RevealCard";
import * as revealCardStyles from "../RevealCard/RevealCard.module.scss";
import * as styles from "./ShowcaseCarousel.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    feature?: boolean;
    data: ProjectBox[];
    children?: Array<React.ReactElement<any>>;
}
export class ShowcaseCarousel extends React.PureComponent<Props> {
    public elements = new Map();

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
                {this.props.data.map((project, index) => (
                    <Observer
                        key={index}
                        onChange={ev => this.handleChange(ev, index)}
                        threshold={0.4}
                    >
                        <RevealCard ref={ref => this.elements.set(index, ref)}>
                            <Link
                                key={project.slug}
                                to={`/our-work/project/${project.slug}`}
                                className={revealCardStyles.revealCardWrapper}
                            >
                                <Image
                                    key={project.titleLineOne}
                                    fadeIn={index >= 7}
                                    alt={project.name}
                                    style={{ backgroundColor: `#d01944` }}
                                    source={
                                        index === 0
                                            ? project.heroImage
                                            : project.thumbnail
                                    }
                                    className={revealCardStyles.cardAlignment}
                                />
                                <Image
                                    source={project.client.promoLogo}
                                    alt={`${project.client.name}'s logo`}
                                    className={revealCardStyles.clientPromoLogo}
                                />
                                <div
                                    className={
                                        revealCardStyles.revealCardContent
                                    }
                                >
                                    <h3>{project.client.name}</h3>
                                    {index === 0 ? (
                                        <p>{project.titleLineOne}</p>
                                    ) : null}
                                    <Button arrow={true} alternate={true}>
                                        View project
                                    </Button>
                                </div>
                            </Link>
                        </RevealCard>
                    </Observer>
                ))}
            </div>
        );
    }
}
export default ShowcaseCarousel;
