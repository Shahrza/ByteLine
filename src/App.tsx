import { useEffect, useState, useRef } from "react";
import useSWR from "swr";

import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Loading from "./components/common/Loading";
import { Article } from "./types/article";

type PaginatedResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  message?: string;
};

function App() {
  const fetcher = (url: string): Promise<PaginatedResponse> =>
    fetch(url).then((res) => res.json());

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, error, isValidating } = useSWR<PaginatedResponse>(
    hasMore
      ? `https://newsapi.org/v2/everything?sources=techcrunch&pageSize=10&page=${page}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data.status !== "ok") {
        setHasMore(false);
        setErrorMessage(data.message);
        return;
      }
      setAllData((prev) => [...prev, ...data.articles]);
      setHasMore(data.articles.length < data.totalResults);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isValidating) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: "100px" }
    );

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasMore, isValidating]);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-9 px-4 grid grid-cols-4 gap-x-5 gap-y-9">
        {allData?.map((article: Article) => (
          <Card item={article} key={article.title} />
        ))}
      </div>
      <div className="my-8">
        {error && (
          <div className="text-center text-red-500 mt-2">
            Failed to load data
          </div>
        )}
        {errorMessage && (
          <div className="text-center text-red-500 mt-2">{errorMessage}</div>
        )}
        {!hasMore && (
          <div className="text-center text-gray-500 mt-2">
            No more items to load
          </div>
        )}
      </div>
      <div ref={loadMoreRef} style={{ height: "1px" }} />
      {isValidating && (
        <div className="flex items-center justify-center my-20">
          <Loading />
        </div>
      )}
    </>
  );
}

export default App;
