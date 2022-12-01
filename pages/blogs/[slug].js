import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Skeleton from "../../components/Skeleton";

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

export default function RecipeDetails({ blog }) {
  console.log("blog", blog);
  if (!blog) return <Skeleton />;

  // const { featuredImage, title, cookingTime, ingredients, method } = blog.fields
  const { title, heroImage, body } = blog.fields;

  return (
    <div className="container">
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

      <style jsx>{`
        .banner {
          margin-bottom: 40px;
        }
        .blogTitle {
          text-align: center;
          margin: 20px 0px;
        }
      `}</style>
      <style global>{`
        .blogBody p,h2,h3,h4,h5,h6,img,ul,ol {
          margin-bottom: 20px;
        }

        .blogBody ol,
        .blogBody ul{
          margin-left:20px;
        }
      `}</style>
    </div>
  );
}
