import useSWR from "swr";

import { fetcher } from "@/services/API";
import { Article } from "@/types/article";

type EverythingResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  message?: string;
};

type URLSearchParams = {
  search: string;
  source: string;
};

const useEverything = (
  page: number = 1,
  { search, source }: URLSearchParams
) => {
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

export default useEverything;
