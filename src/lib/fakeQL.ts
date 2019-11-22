/* eslint-disable @typescript-eslint/no-explicit-any */
export type GQLData = { [key: string]: any } | any[];
class GraphQLFaker {
    private stack: GQLData[] = [];
    private fake?: GQLData;
    public useFake = false;

    public getData = (): GQLData | undefined => {
        if (this.stack.length) {
            return this.stack.pop();
        }
        return this.fake;
    };

    public fakeGQLResponses = (data: GQLData, ...args: GQLData[]) => {
        this.useFake = true;
        this.stack.push(data, ...args);
    };

    public fakeGQLResponse = (data: GQLData) => {
        this.useFake = true;
        this.fake = data;
        this.stack = [];
    };
}

const GQLFaker = new GraphQLFaker();

// Gatsby's graphql function could call this to check whether to use mocks
export const shouldUseFakeGQLResponses = () => GQLFaker.useFake;

// Illustrative mock functions. We could add variants of jest's mock functions too

export const fakeGQLResponses = (data: GQLData, ...args: GQLData[]) =>
    GQLFaker.fakeGQLResponses(data, ...args);

export const fakeGQLResponseOnce = (data: GQLData) =>
    GQLFaker.fakeGQLResponses(data);

export const fakeGQLResponse = (data: GQLData) =>
    GQLFaker.fakeGQLResponse(data);

// Mock functions
export const useStaticQuery = <T extends GQLData>(data?: T): T =>
    data || ({} as T);

export const graphql = (query: string | TemplateStringsArray) =>
    GQLFaker.getData();
