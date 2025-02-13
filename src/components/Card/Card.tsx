import { format } from "date-fns";

import { Article } from "@/types/article";
import NoImage from "@/assets/images/no-image.png";

type Props = {
  item: Article;
};

const Card = ({ item }: Props) => {
  const { title, author, urlToImage, publishedAt, description, source, url } =
    item;

  return (
    <a
      href={url}
      target="_blank"
      className="bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md"
    >
      <img
        className="w-full h-52 object-cover mb-3"
        src={urlToImage ? urlToImage : NoImage}
        alt="cover image"
      />
      <span className="text-xs text-white dark:text-gray-200  bg-cyan-600 px-2 py-1 rounded-full mb-2 inline-block">
        {source.name}
      </span>
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-200">{description}</p>
      <div className="flex text-sm mt-4">
        <p className="text-gray-700 dark:text-gray-200">By {author}</p>
        <span className="mx-2 text-gray-700 dark:text-gray-200">|</span>
        <p className="text-gray-700 dark:text-gray-200">
          {format(new Date(publishedAt), "MMMM dd, yyyy")}
        </p>
      </div>
    </a>
  );
};

export default Card;
