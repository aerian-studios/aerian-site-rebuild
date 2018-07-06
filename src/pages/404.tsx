import * as React from "react";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader";
import { ReactRouterLocation } from "../types/data";

interface Props {
    location: ReactRouterLocation;
}
export const FourOhFour: React.SFC<Props> = ({ location }) => (
    <Layout location={location} title="Page not found">
        <PageHeader>
            <h1>NOT FOUND</h1>
        </PageHeader>
    </Layout>
);
export default FourOhFour;
