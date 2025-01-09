import React from "react";
import { Article } from "../../types/article";

type Props = {
  item: Article;
};

const Card: React.FC<Props> = (props) => {
  const {
    title,
    author,
    source: { name },
    urlToImage,
    publishedAt,
    content,
  } = props.item;
  return (
    <div className="border border-gray-200 rounded-md p-4 my-4">
      <img className="w-full mb-4" src={urlToImage} />

      <h3>{title}</h3>
      <p>{author}</p>
      <p>{name}</p>

      <p>{content}</p>
      <p>{publishedAt}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex mt-4">
        Read More
      </button>
    </div>
  );
};

export default Card;
