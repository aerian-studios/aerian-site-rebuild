/* eslint-disable */
const siteConfig = require("./site-config");
const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
console.log(`Using environment config: '${activeEnv}'`);
require("dotenv").config({
    path: `.env.${activeEnv}`
});
module.exports = {
    pathPrefix: siteConfig.pathPrefix,
    siteMetadata: siteConfig.siteMetadata,
    mapping: {
        "ProjectsJson.client": "ClientsJson"
    },
    plugins: [
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
        {
            resolve: `gatsby-source-twitter`,
            options: {
                credentials: {
                    consumer_key: process.env.TWITTER_CONSUMER_KEY,
                    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                    bearer_token: process.env.TWITTER_CONSUMER_BEARER_TOKEN
                },
                queries: {
                    aerian: {
                        endpoint: "statuses/user_timeline",
                        params: {
                            screen_name: `aerianstudios`,
                            tweet_mode: "extended"
                        },
                        count: 1
                    }
                }
            }
        },
        // This plugin exposes helper functions for processing
        // images with the NPM package “sharp”. It's used by
        // several plugins and should preceed them.
        `gatsby-plugin-sharp`,
        // This plugin identifies file nodes that are images and
        // transforms these to create new “ImageSharp” nodes.
        // With them you can resize images and
        // generate responsive image thumbnails.
        `gatsby-transformer-sharp`,
        // transform JSON file nodes
        `gatsby-transformer-json`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {
                // One convention is to place your Netlify CMS customization code in a
                // `src/cms` directory.
                modulePath: `${__dirname}/src/cms/cms.ts`
            }
        },
        // Manifest for AppCache and PWA compatibility
        {
            resolve: `gatsby-plugin-manifest`,
            options: siteConfig.manifest
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`
    ]
};
