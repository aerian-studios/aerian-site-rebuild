import { graphql } from "gatsby";
import * as React from "react";
import { ContactForm } from "../components/ContactForm";
import { ContactInfo } from "../components/ContactInfo";
import Layout from "../components/Layout";
import { MapView } from "../components/MapView";
import { SocialGrid } from "../components/SocialGrid";
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
                <MapView />
                <ContactInfo title={props.data.pagesJson.title} />
                <ContactForm />
                <SocialGrid />
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
