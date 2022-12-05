import React from "react";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const getUsers = async ({ queryKey }) => {
  const [_, role] = queryKey;
  const result = await fetch("http://localhost:5000/api/users");
  const data = await result.json();
  return data.users.filter((user) => user.role === role);
};
const Users = () => {
  const {
    data: RoleBasedUsers,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users-with-roles", "Machine Learning Engineer"],
    queryFn: getUsers,
    options: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      initialData: [],
    },
  });

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
        {RoleBasedUsers?.map((user) => (
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
