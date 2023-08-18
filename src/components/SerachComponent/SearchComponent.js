import React, { useEffect, useState } from "react";
import "./SearchComponent.css";
import SearchUserCard from "./SearchUserCard";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../redux/User/Action";

const SearchComponent = ({ setIsSearchVisible, setActiveTab }) => {
  const [query, setQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    query && dispatch(searchUserAction({ token, query }));
  }, [query]);

  useEffect(() => {
    setUsersList(user?.searchUser);
  }, [user?.searchUser]);

  return (
    <div className="searchContainer">
      <div className="px-3 pb-5">
        <h1 className="text-xl">Search</h1>
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <hr />
      <div className="px-3 pt-5">
        {usersList?.map((item, index) => (
          <SearchUserCard
            key={index}
            user={item}
            setIsSearchVisible={setIsSearchVisible}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
