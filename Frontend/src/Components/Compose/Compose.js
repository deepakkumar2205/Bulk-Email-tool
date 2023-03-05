import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import EditorToolbar, { modules, formats } from "./test";
import ReactQuill from 'react-quill';
// import QuillToolbar from './test';

const Compose = () => {
  const [value, setValue] = useState('');


  const CustomButton = () => <span className="octicon octicon-star" />;
  const CustomToolbar = () => (
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue={''}
        onChange={(e) => e.persist()}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <select className="ql-color">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="#d0d1d2"></option>
        <option selected></option>
      </select>
      <button className="ql-insertStar">
        <CustomButton />
      </button>
    </div>
  );

  // const modules = {
  //   toolbar: {
  //     container: '#toolbar',
  //     handlers: {
  //       // insertStar: insertStar,
  //     },
  //   },
  // };

  const  modules = {
    toolbar: [
      [{ header:'1' },{header:"2"}, {header:[3,4,5,6]},{font:[]}],
      [{size:[]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      ['code-block']
    ],
  }
  const  formats = [
    'header','font','size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','video','code-block'
  ]

  console.log(value);

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <div className='border' style={{width:"1000px",height:"600px"}}>
        <h1>compose</h1>
        <hr />
        <Form.Group controlId="formFileLg " className="mb-3">
        <Form.Label className='text-start w-100'>Select Excel File </Form.Label>
        <Form.Control type="file"  />
        </Form.Group>  
        <div className="text-editor">
        {/* <CustomToolbar /> */}
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats}/>   
        {/* <EditorToolbar toolbarId={'t1'} />
        <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />  */}
        {/* <QuillToolbar /> */}
        </div> 
      </div>
    </div>
  )
}

export default Compose