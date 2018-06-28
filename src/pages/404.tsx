import * as React from "react";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader";

export const FourOhFour: React.SFC = ({ location }) => (
    <Layout location={location}>
        <PageHeader>
            <h1>NOT FOUND</h1>
        </PageHeader>
    </Layout>
);
export default FourOhFour;
