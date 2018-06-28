import { graphql, StaticQuery } from "gatsby";
import * as React from "react";

import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { isImageSharp } from "../lib/helpers";
import { MeetTheTeam } from "../types/data";

interface Props {
    data: GraphData;
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
                imageNormal
                imageFunny
                description
                fact
                skills
            }
        }
    }
`;

export const MeetTheTeamPage: React.SFC<Props> = props => {
    const { title, staff, heroImage } = props.data.pagesJson;
    return (
        <section className="section section--about">
            <PageHeader>
                {heroImage && isImageSharp(heroImage) ? (
                    <FullScreenMedia
                        image={heroImage.childImageSharp.sizes}
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
            <ul className="block--full block layout-grid">
                {staff.map(person => <li key={person.name}>{person.name}</li>)}
            </ul>
        </section>
    );
};

export default MeetTheTeamPage;
