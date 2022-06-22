import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import "../../css/component.css";
import { logout } from "../../store/slice/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
toast.configure();

const Navbar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logout successfully !", {
      autoClose: 2000,
    });
  };
  return (
    <header className="top_header_section">
      <h2 className="page_name_heading">Mern Demo</h2>
      <ul className="top_navbar_nav">
        <li className="top_navbar_item">
          <Link
            className="top_navbar_logout_btn"
            to={routes.login}
            onClick={logoutHandler}
          >
            <span>Logout</span>
          </Link>
        </li>
      </ul> 
    </header>
  );
};

export default Navbar;
