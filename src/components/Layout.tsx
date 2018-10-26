import classNames from "classnames";
import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";
import favicon from "../../static/assets/favicon.png";
import ErrorBoundary from "../components/ErrorBoundary";
import { PageNavBar } from "../components/PageNavBar";
import { SocialLink } from "../components/SocialLink";
import { SocialLinks } from "../components/SocialLinks";
import "../lib/theme";

import { PageListNode, ReactRouterLocation } from "../types/data";
import { ContactDetails } from "./ContactDetails";
import { PageFooter } from "./PageFooter";

import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faVimeoV } from "@fortawesome/free-brands-svg-icons/faVimeoV";
import * as styles from "./Layout.module.scss";

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
                <div className={classNames(styles.layoutContainer, className)}>
                    <Helmet defaultTitle="Aerian Studios">
                        <html lang="en" />
                        <meta charSet="utf-8" />
                        <meta name="description" content={seoDescription} />
                        <meta name="title" content={seoTitle} />
                        <meta name="keywords" content={seoKeywords} />
                        <link
                            rel="shortcut icon"
                            type="image/png"
                            href={favicon}
                        />
                        <title>{title}</title>
                    </Helmet>
                    <ErrorBoundary>
                        {pages ? (
                            <PageNavBar
                                pages={pages}
                                activePath={location.pathname}
                                className={styles.pageNavBar}
                            />
                        ) : null}
                        <main
                            id="content-wrapper"
                            className={styles.mainElement}
                        >
                            {children}
                        </main>
                        <PageFooter>
                            <ContactDetails
                                phoneNumber="0345 408 6009"
                                street="The Old Malthouse, Mill Lane"
                                locality="Box"
                                postcode="SN13 8PN"
                            />
                            <SocialLinks>
                                <SocialLink
                                    className="item"
                                    icon={faFacebook}
                                    url="https://www.facebook.com/aerianstudios/"
                                />
                                <SocialLink
                                    className="item"
                                    icon={faTwitter}
                                    url="https://twitter.com/aerianstudios"
                                />
                                <SocialLink
                                    className="item"
                                    icon={faLinkedin}
                                    url="https://www.linkedin.com/company/aerian-studios"
                                />
                                <SocialLink
                                    className="item"
                                    icon={faVimeoV}
                                    url="https://vimeo.com/aerianstudios"
                                />
                            </SocialLinks>
                        </PageFooter>
                    </ErrorBoundary>
                </div>
            );
        }}
    />
);

export default Layout;
