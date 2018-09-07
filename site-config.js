const siteTitle = "Aerian Studios";
const siteDescription =
    "Building industry leading campaigns, websites, products and mobile apps for 20 years, and we've never lost a client, because we always deliver on our promises.";
const siteLogo = "/img/furniture/logo.svg";
const siteLongTitle = "Aerian Studios";
const copyright = "Copyright © 2018. Aerian Studios Ltd";
const manifestShortName = "Aerian";
const siteUrl = "https://aerian.com/";
const frontPageURL = "/";
const backgroundColor = "#ffffff"; // Used for setting manifest background color.
const themeColor = "#c62828"; // Used for setting manifest and progress theme colors.

module.exports = {
    pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/my-site/.
    // meta-data for <head>, used by https://github.com/nfl/react-helmet
    siteMetaDate: {
        siteTitle,
        siteDescription,
        siteUrl,
        siteLanguage: "en",
        siteLongTitle
    },
    siteLogo,
    copyright, // Copyright string for the footer of the website and others like feeds, etc.
    // manifest.json, for more info: https://medium.com/dev-channel/how-to-add-a-web-app-manifest-and-mobile-proof-your-site-450e6e485638
    /* eslint-disable camelcase */
    manifest: {
        name: siteTitle,
        short_name: manifestShortName,
        start_url: frontPageURL,
        background_color: backgroundColor,
        theme_color: themeColor,
        display: "minimal-ui",
        icons: [
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            {
                src: "/assets/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/assets/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
    /* eslint-enable camelcase */
};
