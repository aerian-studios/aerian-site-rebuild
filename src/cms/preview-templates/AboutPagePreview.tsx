import * as React from "react";
import { AboutPageTemplate } from "../../templates/what-we-do";

interface Props {
    entry: any;
    widgetFor: any;
}

const AboutPagePreview: React.SFC<Props> = ({ entry, widgetFor }) => (
    <AboutPageTemplate
        title={entry.getIn(["data", "title"])}
        content={widgetFor("body")}
        heroImage={entry.getIn(["data", "heroimage"])}
    />
);

export default AboutPagePreview;
