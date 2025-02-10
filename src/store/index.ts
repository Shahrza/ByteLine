import { create } from "zustand";

type URLSearchParams = {
  search: string;
  source: string;
};

type State = {
  params: URLSearchParams;
  setParams: (params: URLSearchParams) => void;
};

const useStore = create<State>((set) => ({
  params: { search: "", source: "techcrunch" },
  setParams: (params) => set({ params }),
}));

export default useStore;
