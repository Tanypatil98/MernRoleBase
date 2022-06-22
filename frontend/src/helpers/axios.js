import axios from "axios";

export const authHeaders = () => {
  const authToken =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).token;
  return {
    headers: { Authorization: `bearer ${authToken}` },
  };
};

const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

export default Axios;
