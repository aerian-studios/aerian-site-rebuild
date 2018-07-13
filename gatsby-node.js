const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const deepMap = require("deep-map");
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
            const slug = `our-work/project/${edge.node.slug}`;

            generatePage(id, template, slug);
        });

        result.data.allPagesJson.edges.forEach(edge => {
            generateDistinctPage(edge.node);
        });
        return Promise.resolve();
    });
};

const excluded = new Set(["internal", "children", "parent", "id"]);

exports.onCreateNode = ({ node, getNode, getNodes }) => {
    if (node.internal.owner === "gatsby-transformer-json") {
        const parent = getNode(node.parent);
        const makeRelative = value => {
            if (typeof value === "string") {
                const pathToFile = path.join(__dirname, "static", value);
                const foundFileNode = getNodes().find(
                    n => n.absolutePath === pathToFile
                );

                if (foundFileNode) {
                    const p = path.relative(
                        parent.dir,
                        foundFileNode.absolutePath
                    );
                    if (p) {
                        return p;
                    }
                }
            }
            return value;
        };
        Object.keys(node).forEach(key => {
            if (excluded.has(key)) {
                return;
            }

            if (typeof node[key] === "string") {
                node[key] = makeRelative(node[key]);
            }
            deepMap(node[key], makeRelative, {
                inPlace: true
            });
        });
    }
};

exports.onCreateWebpackConfig = (
    { actions, stage, loaders, getConfig },
    { postCssPlugins, ...sassOptions }
) => {
    const sassLoader = {
        loader: require.resolve(`sass-loader`),
        options: {
            sourceMap: stage === "develop",
            ...sassOptions
        }
    };

    const cssLoader = {
        loader: require.resolve("typings-for-css-modules-loader"),
        options: {
            modules: true,
            camelCase: true,
            banner: `/* tslint:disable */
// This file is automatically generated from your CSS. Any edits will be overwritten.`,
            namedExport: true,
            silent: true,
            importLoaders: 2,
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
        }
    };

    const sassModuleRule = {
        test: /\.s(a|c)ss$/,
        use: [
            loaders.miniCssExtract(),
            cssLoader,
            loaders.postcss({
                plugins: [require("autoprefixer")({ browsers: [">1%"] })]
            }),
            sassLoader
        ]
    };

    let configRules = [];
    switch (stage) {
        case `develop`:
        case `build-javascript`:
        case `build-html`:
        case `develop-html`:
            configRules.push(sassModuleRule);
            break;

        case `build-javascript`:
            configRules = [
                sassModuleRule,
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                }
            ];
            break;
        default:
            return;
    }
    actions.setWebpackConfig({
        module: {
            rules: configRules
        },
        resolve: {
            extensions: [
                ".webpack.js",
                ".web.js",
                ".mjs",
                ".js",
                ".json",
                ".jsx",
                ".ts",
                ".tsx"
            ]
        }
    });
};
