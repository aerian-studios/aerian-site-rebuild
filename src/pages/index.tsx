import * as React from "react";
import Link from "gatsby-link";
import { HeroBlock } from "../components/HeroBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";

interface Props {
    data: any;
}

const IndexPage: React.SFC<Props> = ({ data }) => {
    return (
        <main className="layout-grid">
            <HeroBlock>
                <div className="block--hero__content-wrap">
                    <h1>Latest Stories</h1>
                </div>
            </HeroBlock>
            <div className="block--full" />
        </main>
    );
};
export default IndexPage;

export const pageQuery = graphql`
    query IndexQuery {
        allProjectsJson(sort: { order: DESC, fields: [goLiveDate] }) {
            edges {
                node {
                    id
                }
            }
        }
    }
`;
