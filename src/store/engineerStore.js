import create from "zustand";

const searchEngineers = (engs, search) => {
  engs.filter((eng) => dev.role.toLowerCase().includes(search.toLowerCase()));
};
const useEngStore = create((get, set) => ({
  engineers: [],
  allEngineers: [],
  search: "",
  actions: {
    setAllEngineers: (engineers) =>
      set({
        allEngineers: engineers,
        engineers: searchEngineers(engineers, get().search),
      }),
    setSearch: (search) =>
      set({
        search,
        engineers: searchEngineers(get().allEngineers, search),
      }),
  },
}));

export const useEngineers = () => useEngStore((state) => state.engineers);
export const useEngActions = () => useEngStore((state) => state.actions);
