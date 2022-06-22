import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { routes } from "../../constants";
import { useForm } from "../../hooks/useForm";
import Input from "../../component/Common/Input";
import Button from "../../component/Common/Button";
import { addTeacher } from "../../store/slice/teacherSlice";

const TeacherCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFValues = {};

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const validate = () => {
    let valid = false;
    if (!values.name) {
      setErrors({...errors, name: "Please enter valid name!"});
    } else if (!values.email) {
      setErrors({...errors, email: "Please enter valid Email!"});
    } else if (!values.password) {
      setErrors({...errors, description: "Please enter valid Password min length 8!"});
    } else {
      valid = true;
    }
    return valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      let data = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "Teacher"
      }
  
      dispatch(addTeacher({data:data,cb:(err,res) => {
        if(res){
          navigate(routes.homepage);
        }
      }}))
    }
  };

  return (
    <>
      <div className="comman_btn_container center_back_btn">
        <Link to={routes.homepage} className="comman_btn back_btn">
          Back
        </Link>
      </div>
      <div className="project_edit_main_content">
        <div className="about_page_section">
          <div className="about_detaile_row">
            <div className="about_detaile_text_content">
              <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Teacher name"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                type="text"
                id="name"
                error={errors.name}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Teacher Email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                type="email"
                id="email"
                error={errors.email}
              />
            </div>
            <div className="about_detaile_text_content">
            <Input
                className="create_from_input_content"
                labelClassName="create_from_label"
                inputClassName="create_from_input"
                errorClassName="err_text"
                placeholder="Enter your Teacher Password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                type="password"
                id="password"
                error={errors.password}
              />
            </div>
          </div>
          <Button
            className={`project_submit_bottom_btn center_back_btn`}
            buttonClassName="comman_btn"
            onClick={submitHandler}
            text={"Add Teacher"}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherCreatePage;
