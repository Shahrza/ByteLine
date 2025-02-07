import { format } from "date-fns";

import { Article } from "@/types/article";
import NoImage from "@/assets/images/no-image.png";

type Props = {
  item: Article;
};

const Card = (props: Props) => {
  const { title, author, urlToImage, publishedAt, description, source, url } =
    props.item;

  return (
    <a href={url} target="_blank" className="bg-white p-4 rounded-lg shadow-md">
      <img
        className="w-full h-52 object-cover mb-3"
        src={urlToImage ? urlToImage : NoImage}
        alt="cover image"
      />
      <span className="text-xs text-white bg-gray-400 px-2 py-1 rounded-full mb-2 inline-block">
        {source.name}
      </span>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="flex text-sm text-gray-500 mt-4">
        <p>By {author}</p>
        <span className="mx-2">|</span>
        <p>{format(new Date(publishedAt), "MMMM dd, yyyy")}</p>
      </div>
    </a>
  );
};

export default Card;
