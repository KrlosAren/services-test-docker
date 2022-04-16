import axios from "axios";

export const API_URL = "http://localhost:8000/api";

export const getAllStudents = async () => {
  const resp = await axios.get(`${API_URL}/students/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return resp.data;
};

export const authApi = async (username, password) => {
  const resp = await axios.post(`${API_URL}/users/login/`, {
    username,
    password,
  });
  console.log("data auth");
  return resp.data;
};

export const deleteStudent = async (id) => {
  console.log(id);
  const resp = await axios.delete(`${API_URL}/students/${id}/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return resp;
};

export const createStudent = async (form) => {
  const resp = await axios.post(`${API_URL}/students/`, form, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return resp;
};

export const updatedStudent = async (form) => {
  const resp = await axios.put(`${API_URL}/students/${form.pk}/`, form, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return resp;
};
