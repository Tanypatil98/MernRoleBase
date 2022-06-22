import React from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router";
import { routes } from "../../constants";
import { useForm } from "../../hooks/useForm";
import Input from "../../component/Common/Input";
import Button from "../../component/Common/Button";
import { login } from "../../store/slice/userSlice";

toast.configure();
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFValues = {};

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const validate = () => {
    let valid = false;
     if (!values.email) {
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
    if(validate()){ 
        const data = {
        email: values.email,
        password: values.password,
        };
        dispatch(login({data:data,cb:(err,res) => {
            if(res){
                if(res.role === "Principal"){
                    navigate(routes.dashpage);
                }else{
                    navigate(routes.teacher);
                }
            }
        }}))
    }
  };

  return (
    <section className="login_section">
      <div className="login_content">
        <div className="login_top_content">
          <h3>Welcome Back !</h3>
          <p>Sign in to continue...</p>
        </div>
        <div className="login_input_logo_content">
          <div className="login_input_content">
            <Input
              className="login_input_row null"
              errorClassName="err_text"
              type="email"
              placeholder="Enter Your Email"
              label="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              className="login_input_row null"
              errorClassName="err_text"
              type="password"
              placeholder="Enter Password"
              label="Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <Button
              buttonClassName="login_btn"
              onClick={submitHandler}
              text="Submit"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
