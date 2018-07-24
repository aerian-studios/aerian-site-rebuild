import * as React from "react";
import { WhatWeDo } from "../../types/data";
import { HeroBlock } from "../HeroBlock";
import { PageHeader } from "../PageHeader";
import { PageSectionBlock } from "../PageSectionBlock";
import * as styles from "./WhatWeDoPage.module.scss";

interface Props {
    page: WhatWeDo;
}

export const WhatWeDoPage: React.SFC<Props> = ({ page }) => (
    <>
        <PageHeader>
            <HeroBlock heroImage={page.heroImage} aria-labelled-by="page-title">
                <div>
                    <h1>{page.title}</h1>
                </div>
            </HeroBlock>
        </PageHeader>
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
