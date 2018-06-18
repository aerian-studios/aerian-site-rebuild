import * as React from "react";
import Helmet from "react-helmet";

import ErrorBoundary from "../components/ErrorBoundary";

// Theme styles
import "../scss/base-theme.scss";

interface Props {
    children: () => React.Component;
    className?: string;
}

const TemplateWrapper: React.SFC<Props> = ({ children }) => (
    <div className="layout-container">
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="description" content="SET ME PLEASE" />
            <title>SET ME PLEASE</title>
        </Helmet>
        <ErrorBoundary>
            <div id="content-wrapper">{children()}</div>
        </ErrorBoundary>
    </div>
);

export default TemplateWrapper;
