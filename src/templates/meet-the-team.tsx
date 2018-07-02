import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";

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
            <section className="section section--about">
                <PageHeader>
                    {heroImage && isImageSharp(heroImage) ? (
                        <FullScreenMedia
                            image={heroImage.childImageSharp.fluid}
                            altText={title}
                            video=""
                        />
                    ) : (
                        // Cover the situation where there is no imageSharp (e.g. in the cms)
                        <img
                            className="full-screen"
                            src={heroImage}
                            alt=""
                            aria-hidden="true"
                        />
                    )}
                    <div className="block--hero__content-wrap">
                        <h1 className="block--hero__title">{title}</h1>
                        <button>Hello</button>
                    </div>
                </PageHeader>
                {staff.map(person => (
                    <Image
                        key={person.name}
                        source={person.imageFunny}
                        alt={person.name}
                    />
                ))}
            </section>
        </Layout>
    );
};

export default MeetTheTeamPage;
