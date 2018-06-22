const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    /**
     * Work out the necessary to generate disntinct pages
     * @param {object} edge - The data for the distinct page
     */
    const generateDistinctPage = data => {
        const template = data.path && data.path.replace("/", "");
        const { id, sections, staff } = data;

        // for the time being we can just assume that there are different teplates for each of the pages, but we can add logic here to reuse page templates
        createPage({
            path: template,
            component: path.resolve(`src/templates/${String(template)}.tsx`),
            // additional data can be passed via context
            context: {
                id
            }
        });
    };

    /**
     *
     * @param {string} id - JSON id, generally a path to the file
     * @param {string} template - the string name of the template without the `.tsx`
     * @param {string} slug - generally the unique name of the JSON file (without path or file type)
     */
    const generatePage = (id, template, slug) => {
        createPage({
            path: slug,
            component: path.resolve(`src/templates/${String(template)}.tsx`),
            // additional data can be passed via context
            context: {
                id
            }
        });
    };

    /**
     * Run queries to get all the types of pages for which we need to make static pages
     *
     * `allPagesJson` needs a bit more information if we want to control how they are
     * processed in the future
     */
    return graphql(
        `
            {
                allProjectsJson(limit: 1000) {
                    edges {
                        node {
                            id
                            slug
                        }
                    }
                }
                allPagesJson(limit: 1000) {
                    edges {
                        node {
                            id
                            path
                            staff {
                                name
                            }
                            sections {
                                title
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        result.data.allProjectsJson.edges.forEach(edge => {
            const id = edge.node.id;
            const template = "project";
            const slug = edge.node.slug;

            generatePage(id, template, slug);
        });

        result.data.allPagesJson.edges.forEach(edge => {
            generateDistinctPage(edge.node);
        });
        return Promise.resolve();
    });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions;
//     fmImagesToRelative(node);

//     if (node.internal.type.test(/Json$/)) {
//         const value = createFilePath({ node, getNode });
//         createNodeField({
//             name: `name`,
//             node,
//             value
//         });
//     }
// };
