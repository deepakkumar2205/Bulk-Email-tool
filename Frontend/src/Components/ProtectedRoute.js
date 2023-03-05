import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";

const ProtectedRoute = (props) => {
  let isLoggedin = localStorage.getItem("x-Auth-token");
  const contextData  = useContext(Context) ;
  if (isLoggedin) {
    return props.children;
  } else {
    contextData.setNavFlag(false)
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;