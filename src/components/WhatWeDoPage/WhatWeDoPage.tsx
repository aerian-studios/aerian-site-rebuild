import { Link } from "gatsby";
import * as React from "react";
import { WhatWeDo } from "../../types/data";
import { Button } from "../Button";
import { HeroBlock } from "../HeroBlock";
import * as sharedStyles from "../Layout.module.scss";
import { PageHeader } from "../PageHeader";
import { PageSectionBlock } from "../PageSectionBlock";
import { SectionNav } from "../SectionNav";
import * as styles from "./WhatWeDoPage.module.scss";
interface Props {
    page: WhatWeDo;
}

const keys = {
    wePlan: "We plan",
    weDesign: "We design",
    weDevelop: "We develop",
    weDeliver: "We deliver",
    weCelebrate: "We celebrate"
};

const onNavigation = (id: string) => {
    alert(id);
};

export const WhatWeDoPage: React.SFC<Props> = ({ page }) => (
    <>
        <PageHeader>
            <HeroBlock heroImage={page.heroImage} aria-labelled-by="page-title">
                <div>
                    <h1>
                        We work hard<br />so users don't have to
                    </h1>
                    <Button arrow={true} alternate={true}>
                        <Link to={"/our-work/"}>Our work</Link>
                    </Button>
                </div>
            </HeroBlock>
        </PageHeader>
        <SectionNav
            keyConsts={keys}
            onNavigation={onNavigation}
            className={sharedStyles.sectionNav}
            navItemClassName={sharedStyles.sectionNavItem}
            navWrapperClassName={sharedStyles.sectionNavWrapper}
        />
        <section className={styles.contentWrapper}>
            {page.sections &&
                page.sections.map((section, i) => (
                    <PageSectionBlock
                        section={section}
                        alternate={i % 2 === 0}
                    />
                ))}
        </section>
    </>
);
export default WhatWeDoPage;
