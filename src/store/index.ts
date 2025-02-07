import { create } from "zustand";

type State = {
  search: string;
  setSearch: (search: string) => void;
  source: string;
  setSource: (source: string) => void;
};

const useStore = create<State>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  source: "techcrunch",
  setSource: (source: string) => set({ source }),
}));

export default useStore;
