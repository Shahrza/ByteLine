import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import useStore from "@/store/header";

import Card from "@/components/Card/Card";
import Loading from "@/components/common/Loading";
import { Article } from "@/types/article";
import { fetcher } from "@/services/API";

type PaginatedResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  message?: string;
};

const Feed = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const { search } = useStore();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, error, isValidating } = useSWR<PaginatedResponse>(
    `/everything?sources=techcrunch&pageSize=10&page=${page}&q=${search}`,
    fetcher<PaginatedResponse>
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
    setPage(1);
    setAllData([]);
    setHasMore(true);
    setErrorMessage("");
  }, [search]);

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
    <div className="min-h-screen bg-gray-100 py-10 px-5 sm:px-10">
      <div className="container mx-auto mt-9 px-4 grid md:grid-cols-4 grid-cols-1 gap-x-5 gap-y-9">
        {allData?.map((article: Article) => (
          <Card item={article} key={article.url} />
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
    </div>
  );
};

export default Feed;
