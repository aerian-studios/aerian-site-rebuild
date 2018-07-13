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

export const ContactDetails: React.SFC<Props> = ({
    style,
    className,
    phoneNumber,
    street,
    locality,
    region,
    postcode
}) => (
    <div
        className={className}
        style={style}
        itemScope={true}
        itemType="http://schema.org/Organization"
    >
        {phoneNumber && (
            <p className={styles.phoneNumber}>
                Call <span itemProp="telephone">{phoneNumber}</span>
            </p>
        )}
        {(street || locality || region || postcode) && (
            <p
                className={styles.address}
                itemProp="address"
                itemScope={true}
                itemType="http://schema.org/PostalAddress"
            >
                {street && (
                    <span className={styles.part} itemProp="streetAddress">
                        {street}
                    </span>
                )}
                {locality && (
                    <span className={styles.part} itemProp="addressLocality">
                        {locality}
                    </span>
                )}
                {region && (
                    <span className={styles.part} itemProp="addressRegion">
                        {region}
                    </span>
                )}
                {postcode && (
                    <span className={styles.part} itemProp="postalCode">
                        {postcode}
                    </span>
                )}
            </p>
        )}
    </div>
);

export default ContactDetails;
