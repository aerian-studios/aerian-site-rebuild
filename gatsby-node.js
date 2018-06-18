const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    const generatePage = (id, template, slug) => {
        console.log("id", id);
        console.log("slug", slug);
        console.log("template", template);
        createPage({
            path: slug,
            component: path.resolve(`src/templates/${String(template)}.tsx`),
            // additional data can be passed via context
            context: {
                id
            }
        });
    };

    // The “graphql” function allows us to run arbitrary
    // queries against this graphql schema. Like a built-in database constructed
    // from static data that you can run queries against.
    //
    // Post is a data node type derived from data/posts.json
    // which is created when scrapping Instagram. “allPostsJson”
    // is a "connection" (a GraphQL convention for accessing
    // a list of nodes) gives us an easy way to query all
    // Post nodes.
    return graphql(
        `
      {
        allProjectsJson(limit: 1000)  {
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

        // result.data.allPagesJson.edges.forEach(edge => {
        //     generatePage(edge);
        // });
        return Promise.resolve();
    });
};

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//     const { createNodeField } = boundActionCreators;
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
