import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { Page, ReactRouterLocation } from "../types/data";
interface GraphData {
    pagesJson: Page;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const ContactUsPage: React.SFC<Props> = props => {
    return (
        <Layout location={props.location} {...props.data.pagesJson}>
            <section>
                <h1>{props.data.pagesJson.title}</h1>
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query ContactUs($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
    }
`;

export default ContactUsPage;
