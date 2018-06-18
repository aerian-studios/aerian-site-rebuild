/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return graphql(`
        {
            allJSON(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            templateKey
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
            const { id } = edge.node;
            createPage({
                path: edge.node.fields.slug,
                component: path.resolve(
                    `src/templates/${String(
                        edge.node.frontmatter.templateKey
                    )}.tsx`
                ),
                // additional data can be passed via context
                context: {
                    id
                }
            });
        });
        return Promise.resolve();
    });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators;
    fmImagesToRelative(node);

    if (node.internal.type === `JSON`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};
