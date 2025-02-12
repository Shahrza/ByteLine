import useSWR from "swr";

import { fetcher } from "@/services/API";
import { Article } from "@/types/article";
import type { URLSearchParams } from "@/store";

type EverythingResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  message?: string;
};

const useEverything = (
  page: number = 1,
  { search, source, sortBy }: URLSearchParams
) => {
  const params = new URLSearchParams({
    pageSize: "12",
    page: search ? "1" : String(page),
  });

  if (source) params.append("sources", source);
  if (search) params.append("q", search);
  if (sortBy) params.append("sortBy", sortBy);

  const { data, error, isValidating } = useSWR<EverythingResponse>(
    `/everything?${params.toString()}`,
    fetcher,
    { revalidateIfStale: false }
  );

  return { data, error, isValidating };
};

export default useEverything;
