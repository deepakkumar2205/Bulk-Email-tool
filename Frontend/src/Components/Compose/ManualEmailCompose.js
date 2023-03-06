import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { modules , formats } from './QuilData'

export function ManualEmailCompose() {

  return <div className='d-flex justify-content-center align-items-center m-4 composestyle' style={{ height: "80vh" }}>
    <div className='' style={{ width: "1000px", height: "600px" }}>
      <h1>compose</h1>
      <hr />
      <Form.Group controlId="formField " className="mb-3">
        <Form.Label className='text-start w-100'>Recepiant (Only select Excel file below)  </Form.Label>
        <Form.Control type="text" aria-describedby="mailHelpBlock" isInvalid />
        <Form.Text id="mailHelpBlock" muted className='text-start d-flex'>
          Enter email address above seperated by comma
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='text-start w-100'>Subject </Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <div className="text-editor">
        <Form.Label className='text-start w-100'>Content</Form.Label>
        <ReactQuill theme="snow" modules={modules} formats={formats} placeholder='Type your Content to send' className='border border-danger' />
        <Form.Text className='text-start d-flex text-danger'>
          Enter email address above seperated by comma
        </Form.Text>
        <br />
        <Button>Send</Button>
        <br />
      </div>
      <br />
    </div>
  </div>;
}
