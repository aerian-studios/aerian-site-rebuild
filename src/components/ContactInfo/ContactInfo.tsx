import classNames from "classnames";
import * as React from "react";

import * as styles from "./ContactInfo.module.scss";

const internationalisePhone = (phoneNumber: string): string => {
    if (/^0{1}/.test(phoneNumber)) {
        return phoneNumber.replace(/^0/, "+44");
    }

    // because we don't know the format, just return it
    return phoneNumber;
};

interface Props {
    title: string;
    organisationName: string;
    street: string;
    locality: string;
    postcode: string;
    region: string;
    phoneTitle: string;
    phoneNumber: string;
    emailTitle: string;
    email: string;
    style?: React.CSSProperties;
    className?: string;
}

export const ContactInfo: React.SFC<Props> = ({
    title,
    organisationName,
    street,
    locality,
    region,
    postcode,
    phoneTitle,
    phoneNumber,
    emailTitle,
    email,
    style,
    className
}) => (
    <div className={classNames(styles.contactInfo, className)} style={style}>
        <h2>{title}</h2>

        <address
            className={className}
            style={style}
            itemScope={true}
            itemType="http://schema.org/Organization"
        >
            {organisationName && (
                <p className={classNames(styles.orgName)} itemProp="name">
                    <strong>{organisationName}</strong>
                </p>
            )}
            {(street || locality || region || postcode) && (
                <p
                    className={classNames(
                        styles.address,
                        styles.addressSection
                    )}
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
                        <span
                            className={styles.part}
                            itemProp="addressLocality"
                        >
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

            {phoneNumber && phoneTitle && (
                <p
                    className={classNames(
                        styles.phoneNumber,
                        styles.addressSection
                    )}
                >
                    <strong>{phoneTitle}</strong>{" "}
                    <a
                        href={`tel:${internationalisePhone(phoneNumber)}`}
                        itemProp="telephone"
                    >
                        {phoneNumber}
                    </a>
                </p>
            )}
            {email && emailTitle && (
                <p className={classNames(styles.email, styles.addressSection)}>
                    <strong>{emailTitle}</strong>{" "}
                    <a href={"mailto:" + email} itemProp="email">
                        {email}
                    </a>
                </p>
            )}
        </address>
    </div>
);
export default ContactInfo;
