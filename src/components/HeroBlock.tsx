import * as React from "react";

import "./HeroBlock.scss";

export const HeroBlock: React.SFC = ({ children }) => (
    <header className="block--hero block--full block block--dark_skin layout-grid">
        {children}
    </header>
);
