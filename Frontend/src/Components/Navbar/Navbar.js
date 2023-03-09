import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import logo from "./mail.png";
import "./Navbar.css";
import  { BiLogOutCircle } from 'react-icons/bi'

function NavComp() {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  function handleLogout() {
    localStorage.clear();
    contextData.setNavFlag(false);
    navigate("/login");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="">
          <Navbar.Brand onClick={() => navigate("/")} className="overflow-auto">
            <img src={logo} alt="" className="imageStyle " />
            <b>Bulk Email Tool</b>
          </Navbar.Brand>
          {contextData.navFlag ? (
            <>
              {" "}
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/compose")}>
                  Compose
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/graph")}>Graph</Nav.Link>
                <Nav.Link onClick={() => navigate("/log")}>Log</Nav.Link>
                <Nav.Link onClick={() => navigate("/settings")}>
                  Settings
                </Nav.Link>
              </Nav>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                onClick={handleLogout}
                data-bs-placement="bottom"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="This top tooltip is themed via CSS variables."
              >
                {window.innerWidth < 770 ? <BiLogOutCircle/>:"LogOut"}
              </button>
            </>
          ) : (
            <>
              <Nav className="me-auto"></Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavComp;
