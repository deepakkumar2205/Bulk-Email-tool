import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ExcelRenderer } from "react-excel-renderer";
import ReactQuill from "react-quill";
import Context from "../../Context/Context";
import { sendEmailToRecepiantAxios } from "../../Services/axios";
import { ColorRingLoading } from "../../Services/loading";
import { errorToast, toastSuccess } from "../../Services/tostify";
import "./Compose.css";
import ExcelExampleModal from "./ExampleModal";
import { ManualEmailCompose } from "./ManualEmailCompose";
import PreviewModal from "./Modal";
import { formats, modules } from "./QuilData";
import  { BsFillSendCheckFill } from 'react-icons/bs'
import {  useLocation, useNavigate } from "react-router-dom";

const Compose = () => {
  const [recepaintInfo, setRecepaintInfo] = useState([]);
  const [radioValue, setRadioValue] = useState("manual");
  const [enterFlag ,setEnterFlag] = useState(false)
  const contextData = useContext(Context); 
  const navigate = useNavigate();
  const da = useLocation();

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
            let val = res.rows.map((e)=>e[0])
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
        setEnterFlag(true)
        sendEmailToRecepiantAxios({...values,emails: dataModal(values.emails).data})
        .then((res)=>{
          setEnterFlag(false)
          if(res.data.code === 'EAUTH'){
            errorToast("user name and password in settings are invalid")
            navigate("/settings")
          }else if(res.data.envelopeTime){
            toastSuccess(`E_Mail__Sent_Count   : ${res.data.accepted.length}   E_Mail_Reject_Count :  ${res.data.rejected.length}`)
          }else if(res.data.code === 'EENVELOPE'){
            errorToast("Enter the valid Recepiants")
          }
        })
        .catch((err)=>{
          setEnterFlag(false)
          console.log(err)
        })
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

  
  //below funciton remove the duplicates from the string and it split the string into array using comma it separate the string.
  function dataModal(val) {
    let arr = []
    for(let i=0;i<val.length;i++){
      const spaceRemovedEmail = val[i].replace(/ /g,'');
      if(arr.indexOf(spaceRemovedEmail) === -1  && spaceRemovedEmail.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ){
        arr.push(spaceRemovedEmail) 
      }
    }
    let obj={ duplicates         :val.length-arr.length,
              withoutDuplicates  :arr.length,
              total              :val.length ,
              data               :arr
            }
              
    return obj ;
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <div className="d-flex m-4 ms-5 container-lg " style={{ width: "100%" }}>
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
        <ManualEmailCompose  reUse={da.state}/>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center m-4 composestyle"
          style={{ minHeight: "65vh" }}
        >
          {/* //! modal comp below */}
          <PreviewModal recepaintInfo={dataModal(values.emails)} />
          <ExcelExampleModal />
          <div className="" style={{ width: "1000px", height: "600px" }}>
            <h1>compose</h1>
            <hr />
            <form onSubmit={handleSubmit} >
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
                <Button type="submit">{enterFlag ? <ColorRingLoading />:<>Send <BsFillSendCheckFill /></>}</Button>
                <br />
              </div>
              <br />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compose;
