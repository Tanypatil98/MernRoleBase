import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../component/Common/Loader";
import "../../css/LoginPage.css";

const TeacherPage = () => {

  const loader = useSelector((state) => state.user.loader);
  const user = useSelector((state) => state.user.user);

  return (
    <>
    {loader && <Loader />}
    <div className="project_edit_main_content">
        <div className="custom_data_table_content">
          <h2>Hi, Teacher</h2>
          <h2>Email :- {user.email}</h2>
        </div>
      </div>
      </>
  );
};

export default TeacherPage;
