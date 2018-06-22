import { StaticQuery } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { HeroBlock } from "../components/HeroBlock/HeroBlock";
import Layout from "../components/Layout";

interface Props {
    location: {
        pathname: string;
    };
}

const IndexPage: React.SFC<Props> = props => (
    <StaticQuery
        query={graphql`
            query IndexQuery {
                allProjectsJson(sort: { order: DESC, fields: [goLiveDate] }) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `}
        render={data => {
            return (
                <Layout location={props.location}>
                    <section id="section-index">
                        <div className="block--full">This is the home page</div>
                    </section>
                </Layout>
            );
        }}
    />
);

export default IndexPage;
