import React, { useContext, useEffect } from 'react';
import Context from '../../Context/Context';
import { getLogDetails } from '../../Services/axios';
import './Log.css';
import TableComp from './Table';

const Log = () => {
  const contextData = useContext(Context) ;

  useEffect(()=>{
      getLogDetails()
      .then((res)=>{
        contextData.setLogData(res.data)
      })
      .catch((err)=>console.log(err))
  },[])
  return (
    <div  className=' logStyle d-flex justify-content-center mt-4 container-md' >
        <div className='tableComp ' >
            <TableComp />
           {contextData.logData.length === 0 &&  <div className="imgStyleLog">
              <img className='imgTag' src="https://www.eduplusnow.com/assets/social-img/No-Data-Found-Image.png" alt="No Date Found!" />
            </div>}
        </div>
    </div>
    )
}

export default Log