import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

import ErrorBoundary from "../components/ErrorBoundary";
import { PageNavBar } from "../components/PageNavBar";
import { SocialLink } from "../components/SocialLink";
import { SocialLinks } from "../components/SocialLinks";
import "../lib/theme";

import { PageListNode, ReactRouterLocation } from "../types/data";
import { ContactDetails } from "./ContactDetails";
import { PageFooter } from "./PageFooter";

interface Props {
    className?: string;
    // this comes from the router
    location: ReactRouterLocation;
    title?: string;
    seoDescription?: string;
    seoTitle?: string;
    seoKeywords?: string;
}

const Layout: React.SFC<Props> = ({
    children,
    className,
    location,
    title,
    seoTitle,
    seoDescription,
    seoKeywords
}) => (
    <StaticQuery
        query={graphql`
            query PageList {
                allPagesJson(limit: 1000) {
                    edges {
                        node {
                            id
                            path
                            title
                        }
                    }
                }
            }
        `}
        render={data => {
            const pages: PageListNode[] =
                (data && data.allPagesJson && data.allPagesJson.edges) || null;
            return (
                <div className={`layout-container ${className}`}>
                    <Helmet defaultTitle="Aerian Studios">
                        <html lang="en" />
                        <meta charSet="utf-8" />
                        <meta name="description" content={seoDescription} />
                        <meta name="title" content={seoTitle} />
                        <meta name="keywords" content={seoKeywords} />
                        <title>{title}</title>
                    </Helmet>
                    <ErrorBoundary>
                        {pages ? (
                            <PageNavBar
                                pages={pages}
                                activePath={location.pathname}
                            />
                        ) : null}
                        <main id="content-wrapper">{children}</main>
                        <PageFooter>
                            <ContactDetails
                                phoneNumber="0345 408 6009"
                                street="The Old Malthouse, Mill Lane"
                                locality="Box"
                                postcode="SN13 8PN"
                            />
                            <SocialLinks>
                                <SocialLink
                                    iconName="facebook"
                                    url="https://www.facebook.com"
                                />
                                <SocialLink
                                    iconName="twitter"
                                    url="https://www.twitter.com"
                                />
                                <SocialLink
                                    iconName="instagram"
                                    url="https://instagram.com"
                                />
                            </SocialLinks>{" "}
                        </PageFooter>
                    </ErrorBoundary>
                </div>
            );
        }}
    />
);

export default Layout;
