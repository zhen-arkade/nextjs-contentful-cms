import React from "react";
import { useRouter } from "next/router";
import { getAllBlogsByAuthor } from "../../utils/contentful";
import { createClient } from "contentful";
import AuthorBlogCard from "components/AuthorBlogCard";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

const Author = ({ blogs }) => {
  if (!blogs) return <p>not found</p>;

  const authorBlogs = blogs[0].linkedFrom.blogPostCollection.items;
  console.log("authorBlogs", authorBlogs);

  return (
    <>
      <div className="container blog-list">
        {authorBlogs.map((blog) => {
          return (
            <div className="" key={blog.slug}>
              <AuthorBlogCard blog={blog} />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .blog-list {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px 60px;
          padding-top: 30px;
        }

        @media (min-width: 768px) {
          .blog-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
        }
      `}</style>
    </>
  );
};

export default Author;

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "person",
  });

  const paths = res.items.map((item) => {
    console.log("item test", item);
    return {
      params: { slug: item.fields.username },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  console.log("params", params);
  // const { items } = await client.getEntries({
  //   content_type: "blogPost",
  //   "fields.slug": params.slug,
  // });
  const { slug } = params;

  const blogs = await getAllBlogsByAuthor(slug);

  if (!blogs.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { blogs },
    revalidate: 1,
  };
};
