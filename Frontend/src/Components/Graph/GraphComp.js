import React from 'react'
import ChartComp from './Chart'
import DatePicker from './DatePicker'

const GraphComp = () => {
  return (
    <div className='container mt-3 '>
      <DatePicker />
      <ChartComp />
    </div>
  )
}

export default GraphComp