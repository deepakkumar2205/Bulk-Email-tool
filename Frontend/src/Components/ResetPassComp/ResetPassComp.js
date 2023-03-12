import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import inv from '../../assets/404.svg';
import { changePassAxios, checkString } from "../../Services/axios";
import { CircularLoadingWithMultipleCircle } from "../../Services/loading";
import { errorToast, toastSuccess } from "../../Services/tostify";

const ResetPassComp = () => {
  const [flag ,setFlag] = useState('loading');
  const [showPass, setShowPass] = useState("password");
  const [count ,setCount ] = useState(5);
  const [statusButton ,setStatusButton] = useState(true);
  const [tempEmail ,setTempEmail ] =useState("");
  const { string } = useParams();
  const navigate = useNavigate();

  //yup validation
  const userValidationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6,"Password must have atleast 6 characters")
      .required("Password is required"),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password is required")
  });

  const init = {
    password: "",
    confirmPassword: "",
  };
  //formik
  const { values, handleChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: init,
      validationSchema: userValidationSchema,
      onSubmit: (values) => {
        setStatusButton(false)
        console.log(tempEmail);
        changePassAxios({email:tempEmail , password:values.password},string)
        .then((res)=>{
          setStatusButton(true)
          if(res.data.message === "successfull"){
              toastSuccess("Password Changed Successfully")
              setFlag("changed")
             
          }else if(res.data.message === 'invalid'){
              errorToast("Generate the New reset link and try again")
          }
        })
        .catch((err)=>{
          setStatusButton(true)
          console.log(err);
        })
      },
    });
    if(flag === 'changed'){
      setInterval(() => {
        setCount(count-1)
      }, 1000);
      if(count === 0){
        navigate("/login")
      } 
    }
    //! useEffect
    useEffect(()=>{
      checkString(string)
      .then((res)=>{
        if(res.status === 200){
          setFlag("valid")
          setTempEmail(res.data.email)
        }
      })
      .catch((err)=>{
        if(err.response.status === 404){
          setFlag('invalid')
        }
      })
    },[])
 
    //some style part here
    const style1 ={
      height:"80vh",
      width:"100vw",
    }
    const style2 ={
      height:"80vh",
      width:"100vw",
      backgroundImage:"Url(https://cdn.dribbble.com/users/2121936/screenshots/4814257/media/3b45e4716422617a03088177f448e158.gif)",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat" 
    }
/*
 
*/
  return (
    <div
      className="d-flex justify-content-center align-items-center p-2"
      style={flag === 'changed' ? style2 : style1}
    >
     {flag ==='loading'?
     <CircularLoadingWithMultipleCircle />
     :flag === 'invalid' ? <img src={inv} alt="" style={{width:"100vw"}}/>:
     flag === 'changed' ? <div>
     <h3>Successfully Changed</h3>
     <h3>Login Page In</h3>
     <h4>{count}</h4>
  </div>
     :
     <div className="text-start " style={{ width: "300px" }}>
     <h3 className="text-start">Change Password</h3>
     <hr />
     <div>
       <form onSubmit={handleSubmit}>
         <div className="mb-3" >
           <label  htmlFor="pass" className="form-label">Password</label>
           <input
             className={
               errors.password && touched.password !== undefined
                 ? "form-control is-invalid"
                 : "form-control"
             }
             type={showPass}
             id="pass"
             onChange={handleChange}
             name="password"
             onBlur={handleBlur}
             value={values.password}
             placeholder="Enter password"
             aria-describedby="passHelp"
           />
           <div id="passHelp" className="invalid-feedback">
           {errors.password}
         </div>
         </div>

         <div className="mb-3" >
         <label  htmlFor="passconf" className="form-label">Password</label>
           <input
             type={showPass}
             onChange={handleChange}
             className={
               errors.confirmPassword &&
               touched.confirmPassword !== undefined
                 ? "form-control is-invalid"
                 : "form-control"
             }
             onBlur={handleBlur}
             id="passconf"
             name="confirmPassword"
             placeholder="Enter Confirm Password"
             aria-describedby="confPassHelp"
           />
           <div id="confPassHelp" className="invalid-feedback">
           {errors.confirmPassword}
         </div>
         </div>
         <div className="mb-3 form-check">
           <input
             type="checkbox"
             className="form-check-input"
             id="showpasswordid"
             onChange={() =>
               showPass === "password"
                 ? setShowPass("text")
                 : setShowPass("password")
             }
           />
           <label className="form-check-label" htmlFor="showpasswordid">
             Show Password
           </label>
         </div>
         <Button variant="primary" type="submit">
           {statusButton ? "Change" :
            <ColorRing  
            visible={true}
            height="25"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
           }
         </Button>
       </form>
     </div>
   </div> 
    
     }
    </div>
  );
};

export default ResetPassComp;
