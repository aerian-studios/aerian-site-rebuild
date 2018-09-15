import { graphql, Link } from "gatsby";
import * as React from "react";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
import { extractNodes } from "../lib/helpers";
import {
    Client,
    NodeList,
    ProjectBox,
    ReactRouterLocation
} from "../types/data";
import * as styles from "./index.module.scss";
interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    allProjectsJson: NodeList<ProjectBox>;
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout
            location={props.location}
            title={"Aerian Studios"}
            seoDescription={`Industry leading campaigns, websites, products and mobile Apps. 
        Bespoke user driven design and software development with open source web technologies for over 20 years. `}
        >
            <section id="section-index">
                <ShowcaseCarousel feature={true}>
                    {extractNodes(props.data.allProjectsJson).map(
                        (project, index) => (
                            <Link
                                key={project.slug}
                                to={`/our-work/project/${project.slug}`}
                            >
                                <Image
                                    key={project.titleLineOne}
                                    source={
                                        index === 0
                                            ? project.thumbnail
                                            : project.heroImage
                                    }
                                />
                            </Link>
                        )
                    )}
                </ShowcaseCarousel>
            </section>
        </Layout>
    );
};
export const pageQuery = graphql`
    query ProjectsQuery {
        allProjectsJson(
            filter: { featured: { eq: true } }
            sort: { order: DESC, fields: [goLiveDate] }
        ) {
            edges {
                node {
                    ...ProjectBox
                }
            }
        }
    }
`;
export default IndexPage;
