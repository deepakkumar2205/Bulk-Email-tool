import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import login from "../../assets/login.png";
import Context from "../../Context/Context";
import { loginAxios } from "../../Services/axios";
import { ColorRingLoading } from "../../Services/loading";
import { errorToast, toastSuccess } from "../../Services/tostify";

const Login = () => {
  const [showPass, setShowPass] = useState("password");
  const [buttonStatus , setButtonStatus] = useState(true);
  const navigate =useNavigate();
  const contextData = useContext(Context);

  //yup validation
  const userValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Pasword must have atleast 6 characters")
      .required("Password is required"),
  });

  const init = {
    email: "",
    password: "",
  };
  //formik
  const { values, handleChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: init,
      validationSchema: userValidationSchema,
      onSubmit: (values) => {
        setButtonStatus(false)
        loginAxios(values)
        .then((res)=>{
        setButtonStatus(true)
        if(res.status === 200){
          toastSuccess("Login Successfull")
          localStorage.setItem("x-Auth-token",res.data.token)
          localStorage.setItem("user",res.data._id)
          contextData.setNavFlag(true)
          navigate("/")
        }
        })
        .catch((err)=>{
          setButtonStatus(true)
          if(err.response.status === 401){
            errorToast("Invalid Credentials")
          }
        })
      },
    });


  return (
    <div
      className="d-flex flex-wrap justify-content-center align-items-center "
      style={{ height: "90vh" }}
    >
      <div
        className="leftArea bg-black text-primary text-start   "
        style={{ width: "300px", height: "380px" }}
      >
        <div>
          <img
            src={login}
            alt=""
            style={{ width: "300px", height: "380px", objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        className="leftArea align-items-center d-flex justify-conter-center"
        style={{}}
      >
        <form className="text-start border p-3 " onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              values={values.email}
              name="email"
              className={
                errors.email && touched.email !== undefined
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleChange}
              onBlur={handleBlur}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"

            />
             <div id="emailHelp" className="invalid-feedback">
              {errors.email}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
               type={showPass}
               value={values.password}
               name="password"
               className={
                 errors.password && touched.password !== undefined
                   ? "form-control is-invalid"
                   : "form-control"
               }
               onChange={handleChange}
               onBlur={handleBlur}
              id="exampleInputPassword1"
              aria-describedby="confirmHelp"
            />
              <div id="confirmHelp" className="invalid-feedback">
              {errors.password}
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={()=>{
                showPass ==="password"? setShowPass("text"):setShowPass("password")
              }}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {
              buttonStatus ? "Login" :
             <ColorRingLoading />
            }
          </button>
          <br />
          <br />
          <div><Link to="/password-reset">Forgot password?</Link></div>
          <br />
          <div>You Already have an Account? <Link to="/signup">Signup</Link></div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
