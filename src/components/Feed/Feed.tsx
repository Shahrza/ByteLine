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
    `/everything?sources=techcrunch&pageSize=10&page=${
      search ? 1 : page
    }&q=${search}`,
    fetcher<PaginatedResponse>,
    {
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (data) {
      if (data.status !== "ok") {
        setHasMore(false);
        setErrorMessage(data.message);
        return;
      }
      setHasMore(search ? false : data.articles.length < data.totalResults);
      if (search || page === 1) {
        setAllData(data.articles);
        return;
      }
      setAllData((prev) => [...prev, ...data.articles]);
    }
  }, [data, search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !search &&
          !isValidating &&
          !error
        ) {
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
  }, [hasMore, isValidating, error, search]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 sm:px-10">
      {!(page === 1 && isValidating && search) && (
        <div className="container mx-auto mt-9 px-4 grid md:grid-cols-4 grid-cols-1 gap-x-5 gap-y-9">
          {allData?.map((article: Article) => (
            <Card item={article} key={article.url} />
          ))}
        </div>
      )}
      {isValidating && (
        <div className="flex items-center justify-center my-20">
          <Loading />
        </div>
      )}
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
      {!isValidating && <div ref={loadMoreRef} style={{ height: "1px" }} />}
    </div>
  );
};

export default Feed;
