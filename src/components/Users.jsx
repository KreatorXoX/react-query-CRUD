import React from "react";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDevelopers, useDevStore } from "../store/developerStore";

const Users = () => {
  const { isLoading, isError } = useDevelopers();
  const devs = useDevStore((state) => state.devs);
  const search = useDevStore((state) => state.search);
  if (isLoading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error</h2>;
  }
  return (
    <>
      <Link to="/">Home</Link>
      <SearchBar />
      <div className="userList">
        {devs
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <Avatar key={user._id}>
              <img
                style={{ width: "100%", height: "10rem" }}
                src={`${user.image}`}
                alt="profile"
              />
              <p>{user.name}</p>
              <p>{user.company}</p>
              <p>{user.role}</p>
              <button>Edit</button>
              <button>Delete</button>
            </Avatar>
          ))}
      </div>
    </>
  );
};

export default Users;
