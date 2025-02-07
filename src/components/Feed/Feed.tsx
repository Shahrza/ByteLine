import { useEffect, useState, useRef, useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import useStore from "@/store";
import Card from "@/components/Card/Card";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import { Article } from "@/types/article";
import { fetcher } from "@/services/API";

type EverythingResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  message?: string;
};

type HeadlinesResponse = {
  status: string;
  sources: { id: string; name: string }[];
};

const useEverything = (page: number = 1, source?: string, search?: string) => {
  const params = new URLSearchParams({
    pageSize: "10",
    page: search ? "1" : String(page),
  });

  if (source) params.append("sources", source);
  if (search) params.append("q", search);

  const { data, error, isValidating } = useSWR<EverythingResponse>(
    `/everything?${params.toString()}`,
    fetcher,
    { revalidateIfStale: false }
  );

  return { data, error, isValidating };
};

const Feed = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const { search, source, setSource } = useStore();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, error, isValidating } = useEverything(page, source, search);

  const { data: allHeadlines } = useSWRImmutable<HeadlinesResponse>(
    `/top-headlines/sources?category=technology`,
    fetcher<HeadlinesResponse>
  );

  useEffect(() => {
    if (data) {
      if (data.status !== "ok") {
        setHasMore(false);
        setErrorMessage(data.message);
        return;
      }
      setHasMore(
        search || !data.articles.length
          ? false
          : data.articles.length < data.totalResults
      );
      if (search || page === 1) {
        setAllData(data.articles);
        return;
      }
      setAllData((prev) => [...prev, ...data.articles]);
    }
  }, [data, search, page]);

  useEffect(() => {
    setPage(1);
  }, [search, source]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !search &&
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
  }, [hasMore, isValidating, error, search, data]);

  const sourceOptions = useMemo(() => {
    return allHeadlines
      ? allHeadlines.sources.map((source) => ({
          value: source.id,
          label: source.name,
        }))
      : [];
  }, [allHeadlines]);

  return (
    <div className="min-h-screen bg-gray-100 py-5 px-5 md:py-10 md:px-10">
      <div className="container mx-auto mt-0">
        <Select
          onChange={(value: string) => setSource(value)}
          options={sourceOptions}
          placeholder="Select source"
        />
      </div>
      <div className="container mx-auto mt-5 md:mt-9 grid md:grid-cols-4 grid-cols-1 gap-x-5 gap-y-9">
        {!(page === 1 && isValidating && search) &&
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
