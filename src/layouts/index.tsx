import * as React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary";
import { PageNavBar } from "../components/PageNavBar";

// Theme styles
import "../scss/base-theme.scss";

// logo
import * as logo from "../assets/furniture/logo.svg";

interface Props {
    children: () => React.Component;
    className?: string;
}

const pages = [
    {
        path: "/",
        id: "Home"
    },
    {
        path: "/what-we-do",
        id: "what-we-do"
    },
    {
        path: "/meet-the-team",
        id: "meet-the-team"
    }
];

const TemplateWrapper: React.SFC<Props> = ({ className, children }) => (
    <div className={`layout-container ${className}`}>
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="description" content="SET ME PLEASE" />
            <title>SET ME PLEASE</title>
        </Helmet>
        <PageNavBar>
            <div className="{}">
                <svg className="{}">
                    <use xlinkHref={`#${logo.id}`} />
                </svg>
            </div>
            <div>
                {pages
                    ? pages.map(page => {
                          return (
                              <Link to={page.path} key={`menu-${page.id}`}>
                                  <span>
                                      {page.id
                                          .replace("/", "")
                                          .replace("-", " ")}
                                  </span>
                              </Link>
                          );
                      })
                    : null}
            </div>
        </PageNavBar>
        <ErrorBoundary>
            <div id="content-wrapper">{children()}</div>
        </ErrorBoundary>
    </div>
);

export default TemplateWrapper;
