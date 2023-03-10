import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsFillSendCheckFill } from 'react-icons/bs';
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import { sendEmailToRecepiantAxios } from "../../Services/axios";
import { ColorRingLoading } from "../../Services/loading";
import { errorToast, toastSuccess } from "../../Services/tostify";
import { formats, modules } from "./QuilData";
import PreviewEmailsModals from "./ViewEmailsModal";

export function ManualEmailCompose({reUse}) {
  const navigate = useNavigate();
  const [enterFlag ,setEnterFlag] = useState(false)
  const contextData = useContext(Context);
  
  let init = {
    emails: "",
    subject: "",
    htmlTemplate: "",
  };

  // this will update the initial value when you navigate from info page
  if(reUse !== null){
    init = reUse
  }

  const {
    values,
    handleChange,
    setFieldTouched,
    errors,
    setFieldValue,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      setEnterFlag(true)
      const { emails } = values ;
      let splitedData = emails.split(",").map((e)=>e.replace(/ /g,''));
      let arr = []
      for(let i=0;i<splitedData.length;i++){
        if(arr.indexOf(splitedData[i]) === -1 && splitedData[i].match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ){
          arr.push(splitedData[i])
        }
      }

      sendEmailToRecepiantAxios({...values , emails: arr})
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
    validate: (values) => {
      let { emails, subject, htmlTemplate } = values;
      let errors = {};
      if (!emails) {
        errors.emails = "Emails is Required Select File!";
      } else if( emails.length <5){
        errors.emails = 'Enter valid email'
      }
      if (!subject) {
        errors.subject = "Subject is Required!";
      } else if (subject.length < 3) {
        errors.subject = "Subject must have atleast 3 characters.";
      }
      if (!htmlTemplate) {
        errors.htmlTemplate = "Content is Required!";
      }
      return errors;
    },
  });

  //below funciton remove the duplicates from the string and it split the string into array using comma it separate the string.
  function dataModal(val) {
    let dataMod =val.replace(/ /g,'')
    dataMod= dataMod.split(",") ;
    let arr = []
    for(let i=0;i<dataMod.length;i++){
      if(arr.indexOf(dataMod[i]) === -1 && dataMod[i].match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ){
        arr.push(dataMod[i])
      }
    }
    let obj={ duplicates         :dataMod.length-arr.length,
              withoutDuplicates  :arr.length,
              total              :dataMod.length ,
              data               :arr
            }
              
    return obj ;
  }
  

  return (
    <div
      className="d-flex justify-content-center align-items-center m-4 composestyle"
      
    >
      <div className="" style={{ width: "1000px", height: "600px" }}>
        <h1>compose</h1>
        <hr />
        <PreviewEmailsModals recepaintInfo={dataModal(values.emails)}/>
        <form onSubmit={handleSubmit}>
        <Form.Group controlId="formField " className="mb-3">
          <Form.Label className="text-start w-100">
            Recepiant (Only select Excel file below)
          </Form.Label>
          <InputGroup>
          <Form.Control
            type="text"
            aria-describedby="mailHelpBlock"
            value={values.emails}
            onChange={handleChange}
            onBlur={handleBlur}
            name='emails'
            isInvalid={errors.emails && touched.emails}
          />
          {values.emails.length >=5 && <Button variant="outline-secondary" id="mailHelpBlock" onClick={()=>contextData.setPreviewModal(true)}>
          view Emails
        </Button>}
        </InputGroup>
           {errors.emails && touched.emails ? <Form.Text
                  id="mailHelpBlock"
                  className="text-start d-flex text-danger"
                  aria-describedby="mailHelpBlock"
                >
                  {errors.emails}
                </Form.Text> :
          <Form.Text id="mailHelpBlock" muted className="text-start d-flex">
            Enter email address above seperated by comma   &emsp; <b> Eg: </b>&nbsp; yyyyy@gmail.com , xxxxxx@gmail.com
          </Form.Text>}
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className="text-start w-100">Subject </Form.Label>
          <Form.Control 
            type="text"
            placeholder="" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subject}
            name='subject'
            isInvalid={errors.subject && touched.subject}
          />
           {errors.subject && touched.subject && <Form.Text
                  className="text-start d-flex text-danger"
                  aria-describedby="fileView"
                >
                  {errors.subject}
                </Form.Text>  }
        </Form.Group>
        <div className="text-editor">
          <Form.Label className="text-start w-100">Content</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={values.htmlTemplate}
            placeholder="Type your Content to send"
            className={`${errors.htmlTemplate && touched.htmlTemplate ?"border border-danger":""}`}
            onChange={(e,a,b,c)=>{
              if(c.getText().length ===1){
                setFieldValue('htmlTemplate',"")
              }else{
                setFieldValue('htmlTemplate',e)
              }
            }} 
            onBlur={(a,b,c)=>setFieldTouched('htmlTemplate',true)}
          />
          {errors.htmlTemplate && touched.htmlTemplate && (
            <Form.Text
              className="text-start d-flex text-danger"
              aria-describedby="fileView"
            >
              {errors.htmlTemplate}
            </Form.Text>
          )}
          <br />
          <Button type="submit">{enterFlag ? <ColorRingLoading />:<>Send <BsFillSendCheckFill /></>}</Button>
          <br />
        </div>
          </form>
        <br />
      </div>
    </div>
  );
}
