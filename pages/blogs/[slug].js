import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Skeleton from "../../components/Skeleton";
import Link from "next/link";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { blog: items[0] },
    revalidate: 1,
  };
};

export default function BlogDetails({ blog }) {
  if (!blog) return <p>not found</p>;
  console.log("blog", blog);
  const { fields: authorInfo } = blog?.fields?.author;

  // const { featuredImage, title, cookingTime, ingredients, method } = blog.fields
  const { title, heroImage, body } = blog.fields;

  return (
    <div className="container">
      <div className="content">
        <h1 className="blogTitle">{title}</h1>
        <div className="banner">
          <Image
            src={"https:" + heroImage.fields.file.url}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
          />
        </div>
        {/* blog content */}
        <div>
          <div className="blogBody">{documentToReactComponents(body)}</div>
        </div>
      </div>
      {/* sidebar */}
      <div className="sidebar">
        {/* author info */}
        <div className="authorInfo">
          <div className="authorPhoto">
            <Image
              src={"https:" + authorInfo.image.fields.file.url}
              // width={50}
              // height={50}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="authorDetails">
            <div className="name">Author: {authorInfo.name}</div>
            <div className="name">Title: {authorInfo.title}</div>
            <div className="name">Bio: {authorInfo.shortBio}</div>
            <div className="name">Email: {authorInfo.email}</div>
            <div className="name">Phone: {authorInfo.phone}</div>
            <div className="name">Facebook: {authorInfo.facebook}</div>
            <div className="name">Twitter: {authorInfo.twitter}</div>
            <div className="viewAllBlogsBtn">
              <Link href={`/authors/${authorInfo.username}`}>
                View All My Blogs
              </Link>
            </div>
          </div>
        </div>
        {/* tags */}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .content {
        }
        .sidebar {
          background: #eee;
          padding: 20px;
          margin-bottom: 20px;
        }
        .banner {
          margin-bottom: 40px;
        }
        .blogTitle {
          text-align: center;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .authorPhoto {
          width: 50px;
          height: 50px;
          border-radius: 50px;
          overflow: hidden;
          position: relative;
          margin: auto;
          margin-bottom: 25px;
        }
        .authorDetails div {
          margin-bottom: 15px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }
          .content {
            width: 70%;
            padding-right: 30px;
          }
          .sidebar {
            width: 30%;
            margin-bottom: 0px;
          }
        }
      `}</style>
      <style jsx global>{`
        .blogBody p,
        h2,
        h3,
        h4,
        h5,
        h6,
        img,
        ul,
        ol {
          margin-bottom: 20px;
        }

        .blogBody ol,
        .blogBody ul {
          margin-left: 20px;
        }

        .viewAllBlogsBtn a {
          color: #000;
        }
      `}</style>
    </div>
  );
}
