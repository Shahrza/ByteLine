import { create } from "zustand";

export type URLSearchParams = {
  search: string;
  source: string;
  sortBy: string;
};

type State = {
  params: URLSearchParams;
};

type Action = {
  setParams: (params: URLSearchParams) => void;
};

const useStore = create<State & Action>((set) => ({
  params: { search: "", source: "techcrunch", sortBy: "publishedAt" },
  setParams: (params) => set({ params }),
}));

export default useStore;
