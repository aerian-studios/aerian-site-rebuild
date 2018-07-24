import * as React from "react";
import { MeetTheTeam } from "../../types/data";
import { Block } from "../Block";
import { PageHeader } from "../PageHeader";
import { StaffGridBlock } from "../StaffGridBlock";
import * as styles from "./MeetTheTeamPage.module.scss";

interface Props {
    page: MeetTheTeam;
}

export const MeetTheTeamPage: React.SFC<Props> = ({ page }) => (
    <>
        <PageHeader />
        <section>
            <Block>
                <h1>{page.title}</h1>
            </Block>

            <StaffGridBlock staff={page.staff.filter(person => person.live)} />
        </section>
    </>
);
export default MeetTheTeamPage;
