import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../../Context/Context';
import { getLogDetails } from '../../Services/axios';
import './Log.css'
import TableComp from './Table';

const Log = () => {
  const contextData = useContext(Context) ;


  useEffect(()=>{
      getLogDetails()
      .then((res)=>{
        console.log(res.data)
        contextData.setLogData(res.data)
      })
      .catch((err)=>console.log(err))
  },[])
  return (
    <div  className=' logStyle d-flex justify-content-center m-4' >
        <div className='w-100 tableComp' >
            <TableComp data={"sd"}/>
        </div>
    </div>
    )
}

export default Log