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
    data: PagesListData["data"];
}

const TemplateWrapper: React.SFC<Props> = ({ data, className, children }) => (
    <div className={`layout-container ${className}`}>
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="description" content="SET ME PLEASE" />
            <title>SET ME PLEASE</title>
        </Helmet>
        <ErrorBoundary>
            <PageNavBar pages={data}>
                <div className="{}">
                    <svg className="{}">
                        <use xlinkHref={`#${logo.id}`} />
                    </svg>
                </div>
            </PageNavBar>
            <div id="content-wrapper">{children()}</div>
        </ErrorBoundary>
    </div>
);

export default TemplateWrapper;

export interface PageListNode {
    node: {
        id: string;
        path: string;
        title: string;
    };
}

export interface PageList {
    edges: PageListNode[];
}

export interface PagesListData {
    data: {
        allPagesJson: PageList;
    };
}

export const pageListQuery: PagesListData = graphql`
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
`;
