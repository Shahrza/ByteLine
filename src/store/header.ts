import { create } from "zustand";

type State = {
  search: string;
  setSearch: (search: string) => void;
};

const useStore = create<State>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));

export default useStore;
