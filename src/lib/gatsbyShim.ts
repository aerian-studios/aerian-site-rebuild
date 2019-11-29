import { parse } from "graphql";

export {
    default as Link,
    GatsbyLinkProps,
    navigate,
    navigateTo,
    push,
    replace,
    withPrefix,
    withAssetPrefix
} from "gatsby-link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GQLData = { [key: string]: any } | any[];

class GraphQLFaker {
    private stack: GQLData[] = [];
    private fake?: GQLData;
    private map: Record<string, GQLData> = {};

    public getData = (name?: string): GQLData | undefined => {
        if (name && name in this.map) {
            return this.map[name];
        }
        if (this.stack.length) {
            return this.stack.pop();
        }
        return this.fake;
    };

    public fakeGQLResponseByName = (name: string, data: GQLData) => {
        this.map[name] = data;
    };

    public fakeGQLResponses = (data: GQLData, ...args: GQLData[]) => {
        this.stack.push(data, ...args);
    };

    public fakeGQLResponse = (data: GQLData) => {
        this.fake = data;
        this.stack = [];
    };
}

const GQLFaker = new GraphQLFaker();

export const fakeGQLResponses = (data: GQLData, ...args: GQLData[]) =>
    GQLFaker.fakeGQLResponses(data, ...args);

export const fakeGQLResponseOnce = (data: GQLData) =>
    GQLFaker.fakeGQLResponses(data);

export const fakeGQLResponse = (data: GQLData) =>
    GQLFaker.fakeGQLResponse(data);

export const fakeGQLResponseByName = (name: string, data: GQLData) =>
    GQLFaker.fakeGQLResponseByName(name, data);

export const useStaticQuery = <T extends GQLData>(data?: T): T =>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data || ({} as T);

export const extractNameFromQuery = (query: string | TemplateStringsArray) => {
    const qql = typeof query === "string" ? query : query[0];
    if (!qql) {
        return undefined;
    }
    const ast = parse(qql);
    if (ast?.definitions[0]?.kind !== "OperationDefinition") {
        return undefined;
    }
    return ast.definitions[0].name?.value;
};

export const graphql = (query: string | TemplateStringsArray) =>
    GQLFaker.getData(extractNameFromQuery(query));
// If we need to export more from gatsby, then import it
// from the full relative path to the node module
