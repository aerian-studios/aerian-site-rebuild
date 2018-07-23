import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { Page, ReactRouterLocation } from "../types/data";

import { ContactUsPage } from "../components/ContactUsPage";
interface GraphData {
    pagesJson: Page;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const ContactUsTemplate: React.SFC<Props> = ({ data, location }) => {
    return (
        <Layout location={location} {...data.pagesJson}>
            <ContactUsPage page={data.pagesJson} />
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

export default ContactUsTemplate;
