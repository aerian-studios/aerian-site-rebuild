import * as React from "react";

import { storiesOf } from "@storybook/react";
import { projectBox } from "../../types/fixtures";
import { Button } from "../Button";
import { Image } from "../Image";

import { Link } from "gatsby";
import { RevealCard } from "./index";
import * as revealCardStyles from "./RevealCard.module.scss";

storiesOf("RevealCard", module).add("Default", () => (
    <div style={{ width: "20vw", height: "20vw", position: "relative" }}>
        <RevealCard className="myClass">
            <Link
                key={projectBox.slug}
                to={`/our-work/project/${projectBox.slug}`}
                className={revealCardStyles.revealCardWrapper}
            >
                <Image
                    key={projectBox.titleLineOne}
                    fadeIn={false}
                    alt={projectBox.name}
                    backgroundColor={`#d01944`}
                    source={projectBox.thumbnail}
                    className={revealCardStyles.cardAlignment}
                />
                <Image
                    source={projectBox.client.promoLogo}
                    alt={`${projectBox.client.name}'s logo`}
                    className={revealCardStyles.clientPromoLogo}
                />
                <div className={revealCardStyles.revealCardContent}>
                    <h3>{projectBox.client.name}</h3>
                    {<p>{projectBox.titleLineOne}</p>}
                    <Button arrow={true} alternate={true}>
                        View project
                    </Button>
                </div>
            </Link>
        </RevealCard>
    </div>
));
