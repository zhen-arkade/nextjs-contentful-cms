import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";
import { Context } from "../context";

export default function RecipeCard({ blog }) {
  const { title, slug, heroImage } = blog.fields;
  const { state } = useContext(Context);
  const { isDark } = state.themeColor;

  return (
    <div className="card">
      {/* <p>{title}</p> */}
      <div className="featured">
        <Image
          src={"https:" + heroImage.fields.file.url}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
        </div>
        <div className="actions">
          <Link href={"/blogs/" + slug}>
            <a>Read More</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .card {
          // transform: rotateZ(-1deg);
          // max-width: 600px;
          margin: auto;
        }
        .content {
          background: ${isDark ? "#000" : "#fff"};
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
          color: ${isDark ? "#fff" : "#000"};
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: ${isDark ? "#000" : "#fff"};
          background: ${isDark ? "#fff" : "#000"};
          padding: 16px 60px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
