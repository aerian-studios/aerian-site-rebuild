import classNames from "classnames";
import * as React from "react";
import { MeetTheTeam } from "../../types/data";
import { HeroBlock } from "../HeroBlock";
import { PageHeader } from "../PageHeader/PageHeader";
import { StaffGridBlock } from "../StaffGridBlock";
import * as styles from "./MeetTheTeamPage.module.scss";

interface Props {
    page: MeetTheTeam;
}

export const MeetTheTeamPage: React.SFC<Props> = ({ page }) => (
    <section>
        <PageHeader>
            <HeroBlock
                heroImage={page.heroImage}
                aria-labelled-by="page-title"
            />
        </PageHeader>

        <StaffGridBlock staff={page.staff.filter(person => person.live)} />
    </section>
);
export default MeetTheTeamPage;
