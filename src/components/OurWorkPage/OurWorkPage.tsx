import { Link } from "gatsby";
import * as React from "react";
import { Page, ProjectBox } from "../../types/data";
import { Image } from "../Image";
import { PageHeader } from "../PageHeader";
import { ShowcaseCarousel } from "../ShowcaseCarousel";
import * as styles from "./OurWorkPage.module.scss";
interface Props {
    projects: ProjectBox[];
    page: Page;
}

export const OurWorkPage: React.SFC<Props> = ({ projects, page }) => (
    <>
        <PageHeader />
        <section className={styles.component}>
            <div className={styles.sidebar}>
                <h1>{page.title}</h1>
                <p>{page.subheading}</p>
            </div>
            <ShowcaseCarousel
                feature={false}
                className={styles.carousel}
                data={projects}
            />
        </section>
    </>
);
export default OurWorkPage;
