import * as React from "react";

interface Props {
    content: string;
    className: string;
}

const divElement: React.SFC<Props> = ({ content, className }) => (
    <div className={className}>{content}</div>
);
export default divElement;

export const HTMLContent: React.SFC<Props> = ({ content, className }) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);
