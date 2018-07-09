import { graphql, Link } from "gatsby";
import * as React from "react";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
import { extractNodes, isImageSharp } from "../lib/helpers";
import {
    About,
    Client,
    NodeList,
    Project,
    ReactRouterLocation
} from "../types/data";

interface GraphData {
    pagesJson: About;
    allProjectsJson: NodeList<Project>;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const OurWorkPage: React.SFC<Props> = props => {
    const {
        title,
        subheading,
        seoDescription,
        seoKeywords,
        seoTitle
    } = props.data.pagesJson;
    return (
        <Layout
            location={props.location}
            {...{
                title,
                seoDescription,
                seoKeywords,
                seoTitle
            }}
        >
            <section>
                <div>
                    <h1>{title}</h1>
                    <p>{subheading}</p>
                </div>
                <ShowcaseCarousel feature={false}>
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
    query OurWorkPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
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
export default OurWorkPage;
