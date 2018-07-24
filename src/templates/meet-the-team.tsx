import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { MeetTheTeamPage } from "../components/MeetTheTeamPage";
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

export const MeetTheTeamTemplate: React.SFC<Props> = ({ data, location }) => {
    return (
        <Layout location={location} {...data.pagesJson}>
            <MeetTheTeamPage page={data.pagesJson} />
        </Layout>
    );
};

export default MeetTheTeamTemplate;
