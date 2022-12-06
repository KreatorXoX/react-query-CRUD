import create from "zustand";
import { devtools } from "zustand/middleware";
const searchDevs = (devs, search) => {
  return devs.users.filter((dev) =>
    dev.name.toLowerCase().includes(search.toLowerCase())
  );
};
export const useDevStore = create(
  devtools((set, get) => ({
    allDevs: [],
    devs: [],
    search: "",
    setAllDevs: (developers) =>
      set({
        allDevs: developers,
        devs: searchDevs(developers, get().search),
      }),
    setSearch: (search) => {
      set({
        search: search,
        devs: searchDevs(get().allDevs, search),
      });
    },
  }))
);
