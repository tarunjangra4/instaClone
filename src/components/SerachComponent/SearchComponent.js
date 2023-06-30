import React from "react";
import "./SearchComponent.css";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = () => {
  return (
    <div className="searchContainer">
      <div className="px-3 pb-5">
        <h1 className="text-xl">Search</h1>
        <input type="text" className="searchInput" placeholder="Search..." />
      </div>
      <hr />
      <div className="px-3 pt-5">
        {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
          <SearchUserCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
