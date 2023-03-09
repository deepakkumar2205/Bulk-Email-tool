import React, { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import settingsImg from "../../assets/settings.gif";
import { deleteCredentials, getCredential, settingsAxios } from "../../Services/axios";
import {
  CircularLoadingWithMultipleCircle,
  ColorRingLoading
} from "../../Services/loading";
import { errorToast, toastSuccess, toastWarn } from "../../Services/tostify";
import Modalcomp from "./ModalComp.js";
import "./Settings.css";

const Settings = () => {
  const [alert, setAlert] = useState("show");
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("password");
  const [data, setData] = useState({ email: "", password: "" });
  //flag is for initial loading the page
  const [flag, setFlag] = useState(true);
  //set flag 2 for save and updata button
  const [flag1, setFlag1] = useState(true);
  const [loadButton, setLoadButton] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);


  function AlertComp() {
    return (
      <Alert variant="success" onClose={() => setAlert("dont")} dismissible>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Please give your Credentials without hesitation every thing will be
          safe and secured.
        </p>
      </Alert>
    );
  }

  useEffect(() => {
    if (flag) {
      setFlag(false);
      getCredential()
        .then((res) => {
          setAlert("dont");
          setPageLoading(false);
          setData({ email: res.data.email, password: res.data.password });
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            errorToast("Check your internet Connection");
          } else if (err.code === "ERR_BAD_REQUEST") {
            setPageLoading(false);
            setFlag1(false);
          }
        });
    }
  }, []);
  // To save and update the credentials in database
  const handleSave = (e) => {
    setLoadButton(false);
    e.preventDefault();
    settingsAxios({ ...data, user: localStorage.getItem("user") })
      .then((res) => {
        if (res.data.message === "created") {
          setLoadButton(true);
          setAlert(false)
          setLoadButton(true)
          setFlag1(true)
          toastSuccess("Saved Successfully !");
        } else if (res.data.modifiedCount === 0) {
          setLoadButton(true);
          toastWarn("Change something before Update");
        } else if (res.data.message === "updated") {
          setLoadButton(true);
          toastSuccess("Updated Successfully !");
        }
      })
      .catch((err) => {
        setLoadButton(true);
        console.log(err);
      });
  };

  function delCredentials() {
    deleteCredentials()
    .then((res)=>{
      if(res.data.deletedCount ===1 ){
        toastSuccess("Credentials Removed Successfully")
        setData({ email: "", password: "" })
        setAlert('show')
          // setLoadButton(false)
          setFlag1(false)
      }
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div
      className="d-flex justify-content-center flex-wrap"
      style={{ width: "100%" }}
    >
      {pageLoading ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "80vh" }}
        >
          <CircularLoadingWithMultipleCircle />
        </div>
      ) : (
        <>
          <dir>
            <h3 className="text-start">Settings</h3>
            <hr />
            <p className="text-start">
              Set the user name and password credentials of the email on which
              you want to send the email.
            </p>
            <br />
            <div className="formStyle">
              <form
                style={{ width: "500px" }}
                className="text-start "
                onSubmit={(e) => handleSave(e)}
              >
                {alert === "show" && <AlertComp />}
                <Form.Label htmlFor="em">Email id</Form.Label>
                <Form.Control
                  type="email"
                  id="em"
                  aria-describedby="emailHelp"
                  placeholder=""
                  min={6}
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  name="email"
                  required
                />
                <Form.Text id="emailHelp" muted>
                  Enter your valid Email address above
                </Form.Text>
                <br />
                <br />
                <Form.Label htmlFor="inputPassword5">App Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={type}
                    id="inputPassword5"
                    value={data.password}
                    placeholder=""
                    name="password"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    aria-describedby="passwordHelpBlock"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    id="passwordHelpBlock"
                    onClick={() =>
                      type === "password"
                        ? setType("text")
                        : setType("password")
                    }
                  >
                    {type === "password" ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </Button>
                </InputGroup>
                <Form.Text id="passwordHelpBlock" muted>
                  Generate tha app password from
                  <a
                    href="https://myaccount.google.com/"
                    data-bs-toogle="tooltip"
                    rel="noreferrer"
                    title="If you have google account click here to generate passwork in google "
                    target='_blank'
                  >
                    https://myaccount.google.com
                  </a>
                  if your mail is G-mail and also complete
                  <b>2-Step verification </b>. If you are using other email
                  address do this on your concern e-mail website.
                </Form.Text>
                <br />
                <br />
                <div className="d-flex">
                  <Button type="submit" style={{ width: "100px" }}>
                    {loadButton ? (
                      !flag1 ? (
                        "Save"
                      ) : (
                        "Update"
                      )
                    ) : (
                      <ColorRingLoading />
                    )}
                  </Button>

                  {loadButton ? (
                    !flag1 ? (
                      ""
                    ) : (
                      <>
                      <Button
                        type="button"
                        className="m-auto d-inline-block rounded-circle"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Click to remove the above credentials"
                        onClick={()=> delCredentials()}
                      >
                        <MdDeleteOutline />
                      </Button>
                        <Tooltip id="my-tooltip" place="bottom" ></Tooltip>
                        </>
                    )
                  ) : (
                    ""
                  )}
                  <Button
                    type="button"
                    className={!flag1 ? "ms-auto" : ""}
                    onClick={() => setModalShow(true)}
                  >
                    Tutorial
                  </Button>
                  <Modalcomp
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
                <br />
                <h3 className="text-start">Default Settings</h3>
                <hr />
                <p className="text-start">
                  If you didn't provide any credentials above.E-mail should be
                  send from <b>mern.text.mail@gmail.com</b>.
                </p>
                <br />
              </form>
            </div>
          </dir>
          <img src={settingsImg} alt="" className="imgStyle" />
        </>
      )}
    </div>
  );
};

export default Settings;
