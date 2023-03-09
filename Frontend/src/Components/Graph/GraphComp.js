import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ChartComp from './Chart';
import DatePicker from './DatePicker';

const GraphComp = () => {
  const [ toggleChart, setToggleChart ] = useState('line');
  console.log(toggleChart);
  return (
    <div className='container mt-3 d-flex flex-wrap' >
      <div className='w-50' style={{width:"620px"}}>
        <DatePicker />
        <br />
        <br />
      </div>
    <div className='' style={{width:"500px"}}>
    <Form.Label>Select Graph Type</Form.Label>
      <select className="form-select" aria-label="Default select example" onChange={(e)=>setToggleChart(e.target.value)}>
        {/* <option selected>Select Graph</option> */}
        <option value="line" defaultChecked>Line</option>
        <option value="bar">Bar</option>
        <option value="donut">Donut</option>
        <option value="area">Area</option>
      </select>
    </div>
        <br />
        <br />
        <br />
        <br />
        <h1>Chart :  {toggleChart}</h1>
      <div className="w-100 d-flex justify-content-center align-items-center w-100">
        <ChartComp graphType={toggleChart} />
      </div>
    </div>
  )
}

export default GraphComp