import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export async function getAllBlogsByAuthor(username) {
  console.log("username", username);
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllBlogsByAuthor($username: String!) {
        personCollection(where: { username: $username }, limit: 1) {
          items {
            username
            title
            linkedFrom {
              blogPostCollection {
                items {
                  title
                  slug
                  author {
                    name
                  }
                  publishDate
                  description
                  heroImage {
                    url
                    width
                    height
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      username,
    },
  });

  return data.personCollection.items;
}

export async function getPostBySlug(slug) {
  const { data } = await apolloClient.query({
    query: gql`
      query GetPostBySlug($slug: String!) {
        postCollection(where: { slug: $slug }) {
          items {
            title
            subtitle
            sys {
              publishedAt
            }
            image {
              url
            }
            content
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return data.postCollection.items[0];
}

export default { getAllBlogsByAuthor };
