import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAddUser } from "../api/useUsers";
const NewUser = () => {
  const { mutate: addUser, isError, isSuccess } = useAddUser();
  const history = useHistory();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const addUserHandler = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      company,
      role,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Jack_White_at_Rock_Werchter_2018_1_%28cropped%29.jpg/220px-Jack_White_at_Rock_Werchter_2018_1_%28cropped%29.jpg",
    };
    if (name && company && role) {
      addUser(newUser);
      setCompany("");
      setRole("");
      setName("");
      return history.push("/customHookUsers");
    }
  };

  return (
    <div>
      <form onSubmit={addUserHandler}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            placeItems: "center",
            width: "100%",
            marginTop: "3rem",
          }}
        >
          <input
            style={{ width: "25rem", marginBottom: "1rem", height: "2rem" }}
            type="text"
            placeholder="full name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <input
            style={{ width: "25rem", marginBottom: "1rem", height: "2rem" }}
            type="text"
            placeholder="company"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            value={company}
          />
          <input
            style={{ width: "25rem", marginBottom: "1rem", height: "2rem" }}
            type="text"
            placeholder="role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            value={role}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default NewUser;
