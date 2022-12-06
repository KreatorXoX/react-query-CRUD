import React from "react";
import { useDevStore } from "../store/developerStore";
const SearchBar = () => {
  const setSearch = useDevStore((state) => state.setSearch);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="formInput" style={{ position: "relative" }}>
        <input
          style={{ width: "-webkit-fill-available", height: "2rem" }}
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
