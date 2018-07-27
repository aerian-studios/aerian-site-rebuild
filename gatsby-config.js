const siteConfig = require("./site-config");

module.exports = {
    pathPrefix: siteConfig.pathPrefix,
    siteMetadata: siteConfig.siteMetadata,
    mapping: {
        "ProjectsJson.client": "ClientsJson"
    },
    plugins: [
        `gatsby-plugin-netlify`,
        `gatsby-plugin-netlify-cache`,
        `gatsby-plugin-typescript`,
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
        `gatsby-plugin-sass`,
        // Manifest for AppCache and PWA compatibility
        {
            resolve: `gatsby-plugin-manifest`,
            options: siteConfig.manifest
        },
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {
                // One convention is to place your Netlify CMS customization code in a
                // `src/cms` directory.
                modulePath: `${__dirname}/src/cms/cms.ts`,
                stylesPath: `${__dirname}/src/scss/base-theme.scss`
            }
        }
    ]
};
