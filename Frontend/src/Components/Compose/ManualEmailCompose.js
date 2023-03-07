import { useFormik } from "formik";
import React, { useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import Context from "../../Context/Context";
import { sendEmailToRecepiantAxios } from "../../Services/axios";
import { modules, formats } from "./QuilData";
import PreviewEmailsModals from "./ViewEmailsModal";

export function ManualEmailCompose() {

  const contextData = useContext(Context);

  const init = {
    emails: "",
    subject: "",
    htmlTemplate: "",
  };

  const {
    values,
    handleChange,
    setFieldTouched,
    errors,
    setFieldValue,
    resetForm,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      const { emails } = values ;
      const splitedData = emails.split(",");

      sendEmailToRecepiantAxios({...values , emails: splitedData})
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err))
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


  return (
    <div
      className="d-flex justify-content-center align-items-center m-4 composestyle"
      style={{ height: "65vh" }}
    >
      <div className="" style={{ width: "1000px", height: "600px" }}>
        <h1>compose</h1>
        <hr />
        <PreviewEmailsModals recepaintInfo={values.emails.split(",")}/>
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
          <Button type="submit">Send</Button>
          <br />
        </div>
          </form>
        <br />
      </div>
    </div>
  );
}
