import React from "react";

const SearchBar = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="formInput" style={{ position: "relative" }}>
        <input
          style={{ width: "-webkit-fill-available", height: "2rem" }}
          type="text"
          placeholder="Search"
        />
        <button className="searchButton">O</button>
      </div>
    </div>
  );
};

export default SearchBar;
