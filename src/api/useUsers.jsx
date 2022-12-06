import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useDevStore } from "../store/developerStore";

const toastSuccessOpt = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: { backgroundColor: "#08313A" },
};
const toastErrorOpt = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: { backgroundColor: "#4d0000" },
};
const usersApi = axios.create({ baseURL: "http://localhost:5000/api/users" });

// GET USERS AND GET USER BY ID
const getUsers = async () => {
  const result = await usersApi.get("/");
  return result.data;
};
const getUserById = async (id) => {
  const result = await usersApi.get(`/${id}`);
  return result.data.users[0];
};
export const getUsersByRole = async (role) => {
  const result = await usersApi.get(`/role/${role}`);
  return result.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["custom-users"],
    queryFn: getUsers,

    onSuccess: (data) => {
      useDevStore.getState().setAllDevs(data);
    },
  });
};
export const useUserById = (id) => {
  return useQuery({
    queryKey: [`userID-${id}`],
    queryFn: getUserById.bind(null, id),
  });
};
export const useUsersByRole = (role) => {
  return useQuery({
    queryKey: [`users-${role}`],
    queryFn: () => getUsersByRole(role),
  });
};
// POST USERS
const addUser = async (data) => {
  const result = await usersApi.post("/", {
    ...data,
  });
  return result.data;
};
export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => addUser(newUser),
    onMutate: async (newUser) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["custom-users"] });

      // Snapshot the previous value
      const previousUserslist = queryClient.getQueryData(["custom-users"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["custom-users"], (old) => {
        if (old) {
          return { users: [...old.users, newUser] };
        } else {
          return [newUser];
        }
      });
      // Return a context object with the snapshotted value
      return { previousUserslist };
    },
    onSuccess: (response) => {
      toast.success(response.message, toastSuccessOpt);
    },
    onError: (err, newUser, context) => {
      queryClient.setQueryData(["custom-users"], context.previousUserslist);
      toast.error(`${err.response.data.message}`, toastErrorOpt);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-users"] });
    },
  });
};

// PATCH USER
const updateUser = async ({ id, ...rest }) => {
  const result = await usersApi.put(`/${id}`, {
    ...rest,
  });
  return result.data;
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUser(user),
    onMutate: async (user) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["custom-users"] });

      // Snapshot the previous value
      const previousUserslist = queryClient.getQueryData(["custom-users"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["custom-users"], (old) => {
        if (old) {
          return { users: [...old.users, user] };
        } else {
          return [user];
        }
      });
      // Return a context object with the snapshotted value
      return { previousUserslist };
    },
    onSuccess: ({ message }) => {
      toast.success(message, toastSuccessOpt);
    },
    onError: (err, user, context) => {
      queryClient.setQueryData(["custom-users"], context.previousUserslist);
      let errMsg;
      if (err.response.data) {
        errMsg = `${err.response.data.message} - ${err.response.status}`;
      } else if (err.request) {
        errMsg = "request error";
      } else errMsg = err.message;
      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: ["custom-users"],
      });
      queryClient.invalidateQueries({
        queryKey: [`userID-${id}`],
      });
    },
  });
};
// DELETE USER
const deleteUser = async (data) => {
  const result = await usersApi.delete(`/${data.id}`, {
    data: { id: data.id },
  });
  return result.data;
};
export const useRemoveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onError: (err) => {
      let errMsg;
      if (err.response.data) {
        errMsg = `${err.response.data.message} ${err.response.status}`;
      } else if (err.request) {
        errMsg = "request error";
      } else errMsg = err.message;
      toast.error(errMsg, toastErrorOpt);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-users"] });
    },
  });
};
