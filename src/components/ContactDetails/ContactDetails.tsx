import * as React from "react";

import * as styles from "./ContactDetails.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    phoneNumber?: string;
    street?: string;
    locality?: string;
    region?: string;
    postcode?: string;
}

export const ContactDetails: React.SFC<Props> = ({ style, className, phoneNumber, street, locality, region, postcode }) => (
    <div className={[styles.component, className].join(" ")} style={style} itemscope={true} itemtype="http://schema.org/Organization">
        {phoneNumber && (<p className={styles.phoneNumber}>Call <span itemprop="telephone">{phoneNumber}</span></p>)}
        {(street || locality || region || postcode) && <p className={styles.address} itemprop="address" itemscope={true} itemtype="http://schema.org/PostalAddress">
            {street && (<span className={styles.part} itemprop="streetAddress">{street}</span>)}
            {locality && (<span className={styles.part} itemprop="addressLocality">{locality}</span>)}
            {region && (<span className={styles.part} itemprop="addressRegion">{region}</span>)}
            {postcode && (<span className={styles.part} itemprop="postalCode">{postcode}</span>)}
        </p>}
    </div>
);
   
export default ContactDetails;
