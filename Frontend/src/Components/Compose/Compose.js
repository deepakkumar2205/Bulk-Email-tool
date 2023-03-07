import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ExcelRenderer } from "react-excel-renderer";
import ReactQuill from "react-quill";
import Context from "../../Context/Context";
import { sendEmailToRecepiantAxios } from "../../Services/axios";
import { errorToast } from "../../Services/tostify";
import "./Compose.css";
import ExcelExampleModal from "./ExampleModal";
import { ManualEmailCompose } from "./ManualEmailCompose";
import PreviewModal from "./Modal";
import { formats, modules } from "./QuilData";

const Compose = () => {
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
            const val = res.rows.map((e)=>e[0])
            setFieldValue("emails",val)
          }
        });
      } else {
        errorToast("Please select only Excel file types");
      }
    } else {
      console.log("select file");
    }
  };


  const init = {
    emails      : "",
    subject     : "",
    htmlTemplate: "",
  } ;
  
  //formik
  const { values, handleChange, setFieldTouched, errors, setFieldValue,resetForm, handleBlur, touched, handleSubmit} =
  useFormik({
      initialValues: init,
      enableReinitialize:true,
      onSubmit: (values) => {
        console.log(values);
  
        sendEmailToRecepiantAxios(values)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
      },
      validate:(values)=>{
        let {emails ,subject ,htmlTemplate } = values ;
        let errors={};
        if(!emails){
          errors.emails='Emails is Required Select File!'
        }
        if(!subject){
          errors.subject='Subject is Required!'
        }else if(subject.length<3){
          errors.subject='Subject must have atleast 3 characters.'
        }
        if(!htmlTemplate){
          errors.htmlTemplate='Content is Required!'
        }
        return errors ;
      }
    });
  
    useEffect(()=>{
      resetForm()
      setRecepaintInfo([])
    },[radioValue])
 

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
          style={{ height: "65vh" }}
        >
          {/* //! modal comp below */}
          <PreviewModal recepaintInfo={recepaintInfo} />
          <ExcelExampleModal />
          <div className="" style={{ width: "1000px", height: "600px" }}>
            <h1>compose</h1>
            <hr />
            <form onSubmit={handleSubmit}>
              <Form.Group controlId="formFileLg " className="mb-3">
                <Form.Label className="text-start w-100">
                  Enter Email{" "}
                </Form.Label>
                <Form.Control
                  type="file"
                  isInvalid={errors.emails && touched.emails}
                  aria-describedby="mailHelpBlock"
                  onChange={handleFile}
                  onBlur={handleBlur}
                  name="emails"
                />
                {errors.emails && touched.emails ? 
                <Form.Text
                  id="mailHelpBlock"
                  className="text-start d-flex text-danger"
                  aria-describedby="fileView"
                >{errors.emails}
                </Form.Text> : 
                
                <Form.Text
                  id="mailHelpBlock"
                  muted
                  className="text-start d-flex"
                  aria-describedby="fileView"
                >
                  Select the Excel file which contain only email's in fist
                  column one by one
                  <Button
                    className="mx-2 p-0"
                    variant="link"
                    size="sm"
                    onClick={() => contextData.setExampleModalOfExcel(true)}
                  >
                    Example
                  </Button>
                </Form.Text>}
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
              <Form.Group
                controlId="formFile"
                className="mb-3"
              >
                <Form.Label className="text-start w-100">Subject </Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={errors.subject && touched.subject}
                  placeholder="" 
                  value={values.subject}
                  onChange={handleChange}
                  name="subject"
                  onBlur={handleBlur}
                />
                {errors.subject && touched.subject &&  <Form.Text
                  id="mailHelpBlock"
                  className="text-start d-flex text-danger"
                  aria-describedby="fileView"
                >
                  {errors.subject}
                </Form.Text> }
              </Form.Group>
              <div className="text-editor">
                <Form.Label className="text-start w-100">Content </Form.Label>
                <ReactQuill
                  theme="snow"
                  placeholder="Type your Content to send"
                  name='htmlTemplate'
                  className={`${errors.htmlTemplate && touched.htmlTemplate ?"border border-danger":""}`}
                  value={values.htmlTemplate}
                  onChange={(e)=>{
                    if(e === '<p><br></p>'){
                      setFieldValue('htmlTemplate',"")
                    }else{
                      setFieldValue('htmlTemplate',e)
                    }
                  }} 
                  onBlur={(a,b,c)=>setFieldTouched('htmlTemplate',true)}
                  modules={modules}
                  formats={formats}
                />
                {errors.htmlTemplate && touched.htmlTemplate && <Form.Text
                  id="mailHelpBlock"
                  className="text-start d-flex text-danger"
                  aria-describedby="fileView"
                >
                  {errors.htmlTemplate}
                </Form.Text>  }
                <br />
                <Button type="submit">Send</Button>
                <br />
              </div>
              <br />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Compose;
