import { graphql, Link } from "gatsby";
import * as React from "react";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
import { extractNodes } from "../lib/helpers";
import { Client, NodeList, Project, ReactRouterLocation } from "../types/data";
import * as styles from "./index.scss";
interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    allProjectsJson: NodeList<Project>;
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout location={props.location} title={"Aerian Studios"}>
            <section id="section-index">
                <ShowcaseCarousel feature={true}>
                    {extractNodes(props.data.allProjectsJson).map(project => (
                        <Link to={`/our-work/project/${project.slug}`}>
                            <Image
                                key={project.titleLineOne}
                                source={project.heroImage}
                            />
                        </Link>
                    ))}
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
