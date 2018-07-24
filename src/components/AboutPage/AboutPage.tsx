import classNames from "classnames";
import * as React from "react";

import { About, Client } from "../../types/data";
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
    <section>
        <PageHeader>
            <HeroBlock
                heroImage={page.heroImage}
                aria-labelled-by="page-title"
            />
            <div>
                <h1>{page.title}</h1>
            </div>
        </PageHeader>
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
);
export default AboutPage;
