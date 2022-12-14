import { useContext } from "react";

import { createClient } from "contentful";
import BlogCard from "../components/BlogCard";

import { Context } from "../context";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blogPost" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}

export default function Blogs({ blogs }) {
  const { state } = useContext(Context);
  const { searchBarQuery } = state;

  const filteredBlogs = blogs.filter((blog) => {
    if (searchBarQuery === "") {
      //if query is empty
      return blog;
    } else if (blog.fields.title.toLowerCase().includes(searchBarQuery)) {
      //returns filtered array
      return blog;
    }
  });

  return (
    <div className="container blog-list">
      {filteredBlogs.map((blog) => (
        <BlogCard key={blog.sys.id} blog={blog} />
      ))}

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
    </div>
  );
}
