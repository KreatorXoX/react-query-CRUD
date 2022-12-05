import { useQuery } from "@tanstack/react-query";
import { useReducer, useCallback, useMemo } from "react";

import create from "zustand";
import { useUsersByRole } from "./api/useUsers";

function usePokemonSource() {
  const { data: pokemon } = useQuery(
    ["devs"],
    () => fetch("/pokemon.json").then((res) => res.json()),
    {
      initialData: [],
    }
  );

  const [{ search }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      search: "",
    }
  );

  const setSearch = useCallback((search) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [pokemon, search]
  );

  return { pokemon: filteredPokemon, search, setSearch };
}

const searchDevs = (devs, search) => {
  devs.filter((dev) => dev.name.toLowerCase().includes(search.toLowerCase()));
};
const useDevStore = create((get, set) => ({
  developers: ["asd"],
  allDevelopers: [],
  search: "",
  actions: {
    setAllDevelopers: (developers) =>
      set({
        allDevelopers: developers,
        developers: searchDevs(developers, get().search),
      }),
    setSearch: (search) =>
      set({
        search,
        developers: searchDevs(get().allDevelopers, search),
      }),
  },
}));

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
