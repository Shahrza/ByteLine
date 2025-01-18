import React from "react";
import { format } from "date-fns";

import { Article } from "@/types/article";

type Props = {
  item: Article;
};

const Card: React.FC<Props> = (props) => {
  const { title, author, urlToImage, publishedAt, content, source } =
    props.item;
  return (
    <div>
      <img className="w-full h-52 object-cover mb-3" src={urlToImage} />

      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mb-2 inline-block">
        {source.name}
      </span>

      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <p className="text-gray-700">{content}</p>

      <div className="flex text-sm text-gray-500 mt-4">
        <p>By {author}</p>
        <span className="mx-2">|</span>
        <p>{format(new Date(publishedAt), "MMMM dd, yyyy")}</p>
      </div>
    </div>
  );
};

export default Card;
