import React, { useEffect } from "react";
import "../../css/ProjectForm.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher, getTeacherList } from "../../store/slice/teacherSlice";
import Loader from "../../component/Common/Loader";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import ListItem from "../../component/List/ListItem";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();
const TeacherListPage = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.teacher.lists);
  const loader = useSelector((state) => state.teacher.loader);

  useEffect(() => {
    dispatch(getTeacherList());
  }, [dispatch]);

  const onClickHandle = (item) => {
    dispatch(deleteTeacher({data:item._id,cb:(err,res) => {
      if(res){
          toast.success(res)
      }
    }}));
  };

  return (
    <>
      {loader && <Loader />}
      <div className="comman_btn_container center_back_btn">
          <Link
            className="comman_btn back_btn"
            to={routes.addTeacher}
          >
            Add Teacher
          </Link>
      </div>
      <div className="project_edit_main_content">
        <div className="custom_data_table_content">
          <table className="custom_data_table">
            <thead className="custom_data_table_head">
              <tr>
                <th className="custom_data_table_heading">Teacher Name</th>
                <th className="custom_data_table_heading">Teacher Email</th>
                <th className="custom_data_table_heading">Action</th>
              </tr>
            </thead>
            <tbody className="custom_data_table_body">
              {list &&
                list?.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      item={item}
                      i={i}
                      onClickHandle={onClickHandle}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherListPage;
