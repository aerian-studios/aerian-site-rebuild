import * as React from "react";
import { Page } from "../../types/data";
import { ContactForm } from "../ContactForm";
import { ContactInfo } from "../ContactInfo";
import { MapView } from "../MapView";
import { PageHeader } from "../PageHeader";
import { SocialGrid } from "../SocialGrid";
import * as styles from "./ContactUsPage.module.scss";

interface Props {
    page?: Page;
}

export const ContactUsPage: React.SFC<Props> = ({ page }) => (
    <>
        <PageHeader />
        <section className={styles.component}>
            <MapView position={[51.41942, -2.253581]} className={styles.map} />
            <ContactInfo
                title="Drop in and say hi"
                phoneTitle="Give us a call"
                phoneNumber="0345 408 6009"
                organisationName="Aerian"
                street="The Old Malthouse, Mill Lane"
                locality="Box"
                region="Wiltshire"
                postcode="SN13 8PN"
                emailTitle="Send us a message"
                email="info@aerian.com"
            />
            {/* <ContactForm className={styles.contactForm} /> */}
            <SocialGrid className={styles.socialGrid} />
        </section>
    </>
);
export default ContactUsPage;
