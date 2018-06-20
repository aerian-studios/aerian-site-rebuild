import * as React from "react";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const about: React.SFC<Props> = ({ children, style, className }) => (
    <div className={className} style={style}>
        {children}
    </div>
);
export default about;
