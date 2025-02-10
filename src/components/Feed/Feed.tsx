import { useEffect, useState, useRef, useMemo } from "react";

import Card from "@/components/Card/Card";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";

import { Article } from "@/types/article";
import useStore from "@/store";
import useHeadlines from "@/hooks/useHeadlines";
import useEverything from "@/hooks/useEverything";

const Feed = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const { params, setParams } = useStore();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, error, isValidating } = useEverything(page, params);
  const { data: headlines } = useHeadlines();

  useEffect(() => {
    if (data) {
      if (data.status !== "ok") {
        setHasMore(false);
        setErrorMessage(data.message);
        return;
      }
      setHasMore(
        params.search || !data.articles.length
          ? false
          : data.articles.length < data.totalResults
      );
      if (params.search || page === 1) {
        setAllData(data.articles);
        return;
      }
      setAllData((prev) => [...prev, ...data.articles]);
    }
  }, [data, params.search, page]);

  useEffect(() => {
    setPage(1);
  }, [params]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !params.search &&
          !isValidating &&
          !error &&
          data
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
  }, [hasMore, isValidating, error, params.search, data]);

  const sourceOptions = useMemo(() => {
    return headlines
      ? headlines.sources.map((source) => ({
          value: source.id,
          label: source.name,
        }))
      : [];
  }, [headlines]);

  return (
    <div className="min-h-screen bg-gray-100 py-5 px-5 md:py-10 md:px-10">
      <div className="container mx-auto mt-0">
        <Select
          value={params.source}
          onChange={(value: string) =>
            setParams({ search: params.search, source: value })
          }
          options={sourceOptions}
          placeholder="Select source"
        />
      </div>
      <div className="container mx-auto mt-5 md:mt-9 grid md:grid-cols-4 grid-cols-1 gap-x-5 gap-y-9">
        {!(page === 1 && isValidating && params.search) &&
          allData?.map((article: Article) => (
            <Card item={article} key={article.url} />
          ))}
      </div>
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
