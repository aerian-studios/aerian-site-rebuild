import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { StaffGridBlock } from "../components/StaffGridBlock";
import { isImageSharp } from "../lib/helpers";
import { MeetTheTeam, ReactRouterLocation } from "../types/data";

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    pagesJson: MeetTheTeam;
}

export const pageQuery = graphql`
    query MeetTheTeamPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
            staff {
                name
                jobTitle
                live
                imageNormal {
                    childImageSharp {
                        fixed(width: 500) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                imageFunny {
                    childImageSharp {
                        fixed(width: 500) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                description
                fact
                skills
            }
        }
    }
`;

export const MeetTheTeamPage: React.SFC<Props> = props => {
    const {
        title,
        staff,
        heroImage,
        seoDescription,
        seoKeywords,
        seoTitle
    } = props.data.pagesJson;

    return (
        <Layout
            location={props.location}
            {...{
                title,
                seoDescription,
                seoKeywords,
                seoTitle
            }}
        >
            <section>
                <PageHeader>
                    <FullScreenMedia
                        image={heroImage}
                        aria-labelled-by="page-title"
                    />
                    <div className="block--hero__content-wrap">
                        <h1 className="block--hero__title">{title}</h1>
                        <button>Hello</button>
                    </div>
                </PageHeader>

                <StaffGridBlock staff={staff} />
            </section>
        </Layout>
    );
};

export default MeetTheTeamPage;
