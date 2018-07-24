import { Link } from "gatsby";
import * as React from "react";
import { Page, Project } from "../../types/data";
import { Image } from "../Image";
import { PageHeader } from "../PageHeader";
import { ShowcaseCarousel } from "../ShowcaseCarousel";
import * as styles from "./OurWorkPage.module.scss";
interface Props {
    projects: Project[];
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
            <ShowcaseCarousel feature={false} className={styles.carousel}>
                {projects.map(project => (
                    <Link
                        to={`/our-work/project/${project.slug}`}
                        key={project.slug}
                    >
                        <Image
                            key={project.titleLineOne}
                            source={project.heroImage}
                        />
                    </Link>
                ))}
            </ShowcaseCarousel>
        </section>
    </>
);
export default OurWorkPage;
