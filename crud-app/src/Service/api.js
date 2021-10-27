import axios from "axios";

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = "http://localhost:8080/users";
export const getAllUsers = async () => {
  return await axios.get(`${usersUrl}/all`);
};

export const getUserById = async (id) => {
  id = id || "";
  return await axios.get(`${usersUrl}/${id}`);
};

export const getUsers = async (page, sort) => {
  page = page || 0;
  sort = sort || "";
  return await axios.get(`${usersUrl}?page=${page}&sort=${sort}`);
};

export const addUser = async (user) => {
  return await axios.post(`${usersUrl}/add`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};

export const editUser = async (id, user) => {
  return await axios.put(`${usersUrl}/${id}`, user);
};
export const sendEmail = async (id,) => {
  return await axios.put(`${usersUrl}/sendEmail/${id}`);
};
