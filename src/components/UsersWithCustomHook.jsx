import React, { useEffect } from "react";
import Avatar from "./Avatar";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "./SearchBar";
import { useUsers, useRemoveUser, useUsersByRole } from "../api/useUsers";
import { useDevStore } from "../store/developerStore";
import { Link } from "react-router-dom";

const Users = () => {
  const { data, isLoading } = useUsers();
  // const { data, isLoading, isFetched } = useUsersByRole("web");
  const { mutate: removeUser } = useRemoveUser();

  const search = useDevStore((state) => state.search);

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/users/newUser">Add User</Link>
      <SearchBar />
      <div className="userList">
        {data?.users
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <Avatar key={user._id + Math.random()}>
              <img
                style={{ width: "100%", height: "10rem" }}
                src={`${user.image}`}
                alt="profile"
              />
              <p>{user.name}</p>

              <button
                onClick={() => {
                  removeUser({ id: user._id });
                }}
              >
                Delete
              </button>
              <Link to={`/users/edit/${user._id}`}>Edit</Link>
            </Avatar>
          ))}
      </div>
    </>
  );
};

export default Users;
