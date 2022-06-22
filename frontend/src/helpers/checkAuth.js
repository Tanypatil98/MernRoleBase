import jwtDecode from "jwt-decode";

export const checkAuth = () => {
  if (localStorage.getItem("user")) {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const { exp } = jwtDecode(token);
    if (exp * 1000 - 60000 <= new Date().getTime()) {
      localStorage.removeItem("user");
    }
  }
};
