import classNames from "classnames";
import * as React from "react";

import { Link } from "gatsby";
import { About, Client } from "../../types/data";
import { Block } from "../Block";
import { Button } from "../Button";
import { ClientGridBlock } from "../ClientGridBlock";
import { HeroBlock } from "../HeroBlock";
import { Image } from "../Image";
import { PageHeader } from "../PageHeader";
import * as styles from "./AboutPage.module.scss";

interface Props {
    page: About;
    clients: Client[];
}

export const AboutPage: React.SFC<Props> = ({ page, clients }) => (
    <>
        <PageHeader>
            <HeroBlock heroImage={page.heroImage} aria-labelled-by="page-title">
                <div>
                    <h1>If you rely on the web you can rely on us</h1>
                    <Button arrow={true} alternate={true}>
                        <Link to={"/our-work/"}>Our work</Link>
                    </Button>
                </div>
            </HeroBlock>
        </PageHeader>
        <section className={styles.contentWrapper}>
            <Block>
                <h1>{page.subheading}</h1>
                <p>{page.description}</p>
            </Block>
            <ClientGridBlock clients={clients} />
            <div style={{ display: "flex" }}>
                {page.infographic &&
                    page.infographic.map(
                        i =>
                            i.image && (
                                <Image
                                    style={{ width: 100, height: 100 }}
                                    source={i.image}
                                />
                            )
                    )}
            </div>
        </section>
    </>
);
export default AboutPage;
