import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

import ErrorBoundary from "../components/ErrorBoundary";
import { PageNavBar } from "../components/PageNavBar";

// Theme styles
import "../scss/base-theme.scss";

// logo
import * as logo from "../assets/furniture/logo.svg";
// import { PagesListData } from "../types/data";

interface Props {
    className?: string;
    // this comes from the router
    location: {
        pathname: string;
    };
}

const Layout: React.SFC<Props> = ({ children, className, location }) => (
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
            return (
                <div className={`layout-container ${className}`}>
                    <Helmet defaultTitle="Aerian Studios">
                        <html lang="en" />
                        <meta charSet="utf-8" />
                        <meta name="description" content="SET ME PLEASE" />
                        <title>SET ME PLEASE</title>
                    </Helmet>
                    <ErrorBoundary>
                        <PageNavBar pages={data} activePath={location.pathname}>
                            <div className="{}">
                                <Link to="/">
                                    <svg className="{}">
                                        <use xlinkHref={`#${logo.id}`} />
                                    </svg>
                                </Link>
                            </div>
                        </PageNavBar>
                        <main id="content-wrapper" className="layout-grid">
                            {children}
                        </main>
                    </ErrorBoundary>
                </div>
            );
        }}
    />
);

export default Layout;
