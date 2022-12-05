import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUpdateUser, useUserById } from "../api/useUsers";
const EditUser = () => {
  const { mutate: updateUser } = useUpdateUser();
  const { userId } = useParams();
  const { data: user, isLoading } = useUserById(userId);

  const history = useHistory();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setId(user._id);
      setName(user.name);
      setRole(user.role);
      setCompany(user.company);
    }
  }, [user]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const editUser = {
      id,
      name,
      company,
      role,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Jack_White_at_Rock_Werchter_2018_1_%28cropped%29.jpg/220px-Jack_White_at_Rock_Werchter_2018_1_%28cropped%29.jpg",
    };
    history.replace("/customHookUsers");
    updateUser(editUser);
    setCompany("");
    setRole("");
    setName("");
  };
  return (
    <div>
      <form onSubmit={updateUserHandler}>
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
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditUser;
