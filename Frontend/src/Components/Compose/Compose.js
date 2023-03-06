import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ExcelRenderer } from "react-excel-renderer";
import "./Compose.css";
import PreviewModal from "./Modal";
import Context from "../../Context/Context";
import { errorToast } from "../../Services/tostify";
import ExcelExampleModal from "./ExampleModal";
import { useFormik } from "formik";
import { ManualEmailCompose } from "./ManualEmailCompose";
import * as yup from "yup";
import { modules, formats } from "./QuilData";

const Compose = () => {
  const [value, setValue] = useState("");
  const [recepaintInfo, setRecepaintInfo] = useState([]);
  const [radioValue, setRadioValue] = useState("manual");
  const contextData = useContext(Context);

  const radios = [
    { name: "Manual send", value: "manual" },
    { name: "Bulk email send", value: "file" },
  ];

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        ExcelRenderer(selectedFile, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            setRecepaintInfo(res.rows);
          }
        });
      } else {
        errorToast("Please select only Excel file types");
      }
    } else {
      console.log("select file");
    }
  };

  //yup validation:
  const userValidationSchema = yup.object().shape({});

  const init = {
    emails: "",
    subject: "",
    htmlTemplate: "",
  };

  //formik
  const { values, hanldeChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: init,
      validateSchema: userValidationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <>
      <div className="d-flex m-4" style={{ width: "95vw" }}>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-primary"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      {/*//! mail part start from here */}
      {radioValue === "manual" ? (
        <ManualEmailCompose />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center m-4 composestyle"
          style={{ height: "80vh" }}
        >
          {/* //! modal comp below */}
          <PreviewModal recepaintInfo={recepaintInfo} />
          <ExcelExampleModal />
          <div className="" style={{ width: "1000px", height: "600px" }}>
            <h1>compose</h1>
            <hr />
            <Form.Group controlId="formFileLg " className="mb-3">
              <Form.Label className="text-start w-100">Enter Email </Form.Label>
              <Form.Control
                type="file"
                aria-describedby="mailHelpBlock"
                onChange={handleFile}
              />
              <Form.Text
                id="mailHelpBlock"
                muted
                className="text-start d-flex"
                aria-describedby="fileView"
              >
                Select the Excel file which contain only email's in fist column
                one by one{" "}
                <Button
                  className="mx-2 p-0"
                  variant="link"
                  size="sm"
                  onClick={() => contextData.setExampleModalOfExcel(true)}
                >
                  Example
                </Button>
              </Form.Text>
            </Form.Group>
            {recepaintInfo.length !== 0 && (
              <Button
                variant="outline-secondary"
                id="fileView"
                className="text-start d-flex"
                size="sm"
                onClick={() => contextData.setComposeRecepiantModal(true)}
              >
                View Recepiant details
              </Button>
            )}
            <br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="text-start w-100">Subject </Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <div className="text-editor">
              <Form.Label className="text-start w-100">Content </Form.Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              />
              <br />
              <Button>Send</Button>
              <br />
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Compose;
