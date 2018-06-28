import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";

interface Props {
    location: {
        pathname: string;
    };
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout location={props.location} title={"Aerian Studios"}>
            <section id="section-index">
                <PageHeader>
                    <h1>This is the home page</h1>
                </PageHeader>
            </section>
        </Layout>
    );
};

export default IndexPage;
