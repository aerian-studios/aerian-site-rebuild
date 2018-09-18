import { Stats } from "fs";
import { ParsedPath } from "path";

export type ImageField = string | ImageSharp;
export type FileField = string | Partial<FileNode>;

// Images

export interface GalleryImage {
    alt?: string;
    image: ImageField;
}

export interface FileNode extends ParsedPath, Stats {
    publicURL: string;
    id: string;
    children: any[];
    sourceInstanceName: string;
    absolutePath: string;
    relativePath: string;
    relativeDirectory: string;
    extension: string;
    size: number;
    prettySize: string;

    modifiedTime: string;
    accessTime: string;
    changeTime: string;
    birthTime: string;
    internal: {
        contentDigest: string;
        type: "Directory" | "File";
        mediaType?: string;
        description: string;
    };
}

export interface ImageSharp extends Partial<FileNode> {
    childImageSharp: {
        fluid?: ImageSharpFluid;
        fixed?: ImageSharpFixed;
    };
}
export interface ImageSharpFluid {
    aspectRatio?: number;
    sizes?: string;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
    base64?: string;
}

export interface ImageSharpFixed {
    aspectRatio?: number;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
    base64?: string;
    width: number;
    height: number;
}

// PAGES

export interface NodeList<T> {
    edges: Array<Edge<T>>;
}

export interface Edge<T> {
    node: T;
}
export interface PagesListData {
    data: {
        allPagesJson: PageList;
    };
}

export interface PageList {
    edges: PageListNode[];
}

export type PageListNode = Edge<PageRef>;

export interface PageRef {
    id: string;
    path: string;
    title: string;
}

export interface PageSection {
    title: string;
    image?: ImageField;
    smallImage?: ImageField;
    subtitle: string;
    blurb: string;
    activities?: Activity[];
    successStory?: SuccessStory;
    testimonial?: Testimonial;
}

export interface Page {
    title: string;
    path: string;
    heroImage?: ImageField;
    subheading: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
}

export interface WhatWeDo extends Page {
    sections?: PageSection[];
}

export interface MeetTheTeam extends Page {
    staff: Staff[];
}

export interface About extends Page {
    infographic?: Infographic[];
}

export type InfographicType =
    | "Single Line"
    | "Compact Single Line"
    | "Split"
    | "Bar"
    | "Vertical"
    | "Horizontal"
    | "Surround";
export interface Infographic {
    primaryText?: string;
    type: InfographicType;
    secondaryText?: string;
    image?: ImageField;
    imageCount: number;
    secondaryImage?: ImageField;
}

export interface Staff {
    name: string;
    jobTitle: string;
    live: boolean;
    imageNormal: ImageField;
    imageFunny: ImageField;
    description: string;
    fact: string;
    skills: string[];
}

export interface ReactRouterLocation {
    action: string;
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null | string;
}

export interface Testimonial {
    quote?: string;
    person?: string;
    title?: string;
    avatar?: ImageField;
    image?: ImageField;
}

export interface Stat {
    title: string;
    text: string;
    image: ImageField;
}
export interface SuccessStory {
    title: string;
    stats?: Stat[];
}

export interface Activity {
    title: string;
    text: string;
}

export interface Hurdle {
    title: string;
    image: ImageField;
    text: string;
}

export interface ProjectStage {
    description: string;
    hurdles: Hurdle[];
}

export interface Performance {
    title: string;
    text: string;
}
export interface ProjectBox {
    name: string;
    slug: string;
    heroImage: ImageField;
    thumbnail: ImageField;
    client: Client;
    titleLineOne: string;
}
export interface Project {
    name: string;
    slug: string;
    heroImage: ImageField;
    heroVideo?: string;
    titleLineOne: string;
    titleLineTwo?: string;
    client: Client;
    goLiveDate?: string;
    caseStudyTitle: string;
    caseStudyText: string;
    caseStudyImage: ImageField;
    externalUrl: string;
    rolloverDetails: string;
    homepage: boolean;
    featured: boolean;
    gallery: GalleryImage[];
    challenge: ProjectStage;
    solution: ProjectStage;
    results: ProjectStage;
    performance?: Performance[];
    testimonial?: Testimonial;
}

export interface Client {
    name: string;
    logo: ImageField;
    promoLogo: ImageField;
    featured: boolean;
    featuredProject?: string;
    id: string;
}
