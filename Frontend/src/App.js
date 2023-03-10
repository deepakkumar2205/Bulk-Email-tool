import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Compose from "./Components/Compose/Compose";
import Emailverify from "./Components/Emailverify/Emailverify";
import GraphComp from "./Components/Graph/GraphComp";
import Home from "./Components/Home/Home";
import Info from "./Components/Log/Info/Info";
import Log from "./Components/Log/Log";
import Login from "./Components/Login/Login";
import NavComp from "./Components/Navbar/Navbar";
import PasswordRes from "./Components/Password-Reset/PasswordRes";
import ProtectedRoute from "./Components/ProtectedRoute";
import ResetPassComp from "./Components/ResetPassComp/ResetPassComp";
import Settings from "./Components/Settings/Settings";
import Signup from "./Components/Signup/Signup";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("x-Auth-token")) {
      navigate("/")
    }
  }, []);

  return (
    <div className="App">
      <NavComp  />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/compose"        element={<ProtectedRoute><Compose /></ProtectedRoute>} />
        <Route path="/graph"          element={<ProtectedRoute><GraphComp /></ProtectedRoute>} />
        <Route path="/log/*"            element={<ProtectedRoute><Log /></ProtectedRoute>} />
        <Route path="/login/info" element={<ProtectedRoute><Info /></ProtectedRoute>} />
        <Route path="/settings"       element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/login"          element={<Login />} />
        <Route path="/password-reset" element={<PasswordRes />} />
        <Route path="/signup"         element={<Signup />} />
        <Route
          path="/pas-reset-completion/:string"
          element={<ResetPassComp />}
        />
        <Route path="/emailverify/:string" element={<Emailverify />} />
      </Routes>
    </div>
  );
}

export default App;
