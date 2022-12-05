import React from "react";
import Avatar from "./Avatar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUsers, useRemoveUser } from "../api/useUsers";
import { useMutation } from "@tanstack/react-query";

import { Link } from "react-router-dom";

const Users = () => {
  const { data, isLoading } = useUsers();
  const { mutate: removeUser } = useRemoveUser();

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/users/newUser">Add User</Link>

      <div className="userList">
        {data?.users.map((user) => (
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
