import { graphql } from "gatsby";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { ContactForm } from "../components/ContactForm";
import { ContactInfo } from "../components/ContactInfo";
import Layout from "../components/Layout";
import { MapView } from "../components/MapView";
import { SocialGrid } from "../components/SocialGrid";
import { Page, ReactRouterLocation } from "../types/data";

import * as styles from "./contact-us.scss";
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
            <section className={styles.component}>
                <MapView
                    position={[51.4194618, -2.2542012]}
                    className={styles.map}
                />
                {/* <ContactInfo title={props.data.pagesJson.title} /> */}
                <ContactForm className={styles.contactForm} />
                <SocialGrid className={styles.socialGrid} />
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
