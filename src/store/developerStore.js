import create from "zustand";
import { devtools } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";
import { getUsersByRole } from "../api/useUsers";
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

export const useDevelopers = (role = "developer") => {
  return useQuery({
    queryKey: [`users-${role}`],
    queryFn: () => getUsersByRole(role),
    onSuccess: (data) => {
      useDevStore.getState().setAllDevs(data);
    },
  });
};
