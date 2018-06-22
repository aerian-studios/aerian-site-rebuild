const siteConfig = require("./site-config");

module.exports = {
    pathPrefix: siteConfig.pathPrefix,
    siteMetadata: siteConfig.siteMetadata,
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/assets`,
                name: "uploads"
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: "pages"
            }
        },
        // This plugin identifies file nodes that are images and
        // transforms these to create new “ImageSharp” nodes.
        // With them you can resize images and
        // generate responsive image thumbnails.
        `gatsby-transformer-sharp`,
        // transform JSON file nodes
        `gatsby-transformer-json`,
        // This plugin exposes helper functions for processing
        // images with the NPM package “sharp”. It's used by
        // several plugins.
        `gatsby-plugin-sharp`,
        // Manifest for AppCache and PWA compatibility
        {
            resolve: `gatsby-plugin-manifest`,
            options: siteConfig.manifest
        },
        // must come AFTER manifest plugin, Generates a service worker and AppShell
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                sourceMaps: `inline`
            }
        },
        // {
        //     resolve: `gatsby-plugin-netlify-cms`,
        //     options: {
        //         // One convention is to place your Netlify CMS customization code in a
        //         // `src/cms` directory.
        //         modulePath: `${__dirname}/src/cms/cms.ts`
        //     }
        // },
        `gatsby-plugin-typescript`
    ]
};
