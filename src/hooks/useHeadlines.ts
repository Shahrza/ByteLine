import useSWRImmutable from "swr/immutable";

import { fetcher } from "@/services/API";

type HeadlinesResponse = {
  status: string;
  sources: { id: string; name: string }[];
};

const useHeadlines = () => {
  const { data, error, isValidating } = useSWRImmutable<HeadlinesResponse>(
    `/top-headlines/sources?category=technology`,
    fetcher<HeadlinesResponse>
  );

  return {
    data,
    error,
    isValidating,
  };
};

export default useHeadlines;
