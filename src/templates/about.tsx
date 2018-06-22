import * as React from "react";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}

export const about: React.SFC<Props> = ({
    children,
    style,
    className,
    location
}) => (
    <Layout location={props.location}>
        <main className={[className, "layout-grid"].join(" ")} style={style}>
            {children}
        </main>
    </Layout>
);
export default about;
