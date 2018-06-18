import * as React from "react";
import Link from "gatsby-link";
import { HeroBlock } from "../components/HeroBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";

interface Props {
    data: any;
}

const IndexPage: React.SFC<Props> = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <main className="layout-grid">
            <HeroBlock>
                <FullScreenMedia video="/assets/687898845.mp4" />
                <div className="block--hero__content-wrap">
                    <h1>Latest Stories</h1>
                </div>
            </HeroBlock>
            <div className="block--full">
                {posts
                    .filter(
                        post =>
                            post.node.frontmatter.templateKey === "blog-post"
                    )
                    .map(({ node: post }, index) => (
                        <section
                            className={`block layout-grid ${
                                index % 2 !== 0
                                    ? "block--dark-grey_skin"
                                    : "block--white_skin"
                            }`}
                            key={post.id}
                        >
                            <div className="content-wrap">
                                <div className="media-content">
                                    <h2 className="section-title">
                                        {post.frontmatter.title}
                                    </h2>
                                    <small>{post.frontmatter.date}</small>
                                    <p>{post.excerpt}</p>
                                    <Link
                                        className="button"
                                        to={post.fields.slug}
                                    >
                                        Keep Reading →
                                    </Link>
                                </div>
                            </div>
                        </section>
                    ))}
            </div>
        </main>
    );
};
export default IndexPage;

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 400)
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        templateKey
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`;
