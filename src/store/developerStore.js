import create from "zustand";

const searchDevs = (devs, search) => {
  devs.filter((dev) => dev.name.toLowerCase().includes(search.toLowerCase()));
};
export const useDevStore = create((set) => ({
  search: "",
  setSearch: (search) => {
    set((state) => ({ ...state, search: search }));
  },
}));
