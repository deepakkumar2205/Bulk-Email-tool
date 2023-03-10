import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import { getLogDetails } from '../../Services/axios';
import { CircularLoadingWithMultipleCircle } from '../../Services/loading';
import { errorToast } from '../../Services/tostify';
import './Log.css';
import TableComp from './Table';

const Log = () => {
  const [loading ,setLoading ] = useState(true);
  const contextData = useContext(Context) ;

  useEffect(()=>{
      getLogDetails()
      .then((res)=>{
        setLoading(false)
        contextData.setLogData(res.data)
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
        errorToast('Error')
      })
  },[])
  return (
    <div  className=' logStyle container-md' >
      {loading?
      <div className='d-flex align-items-Center w-100 justify-content-center mt-5'>
        <CircularLoadingWithMultipleCircle />
      </div>
      :
      <div className='tableComp ' >
          <TableComp />
          {contextData.logData.length === 0 &&  <div className="imgStyleLog">
            <img className='imgTag' src="https://www.eduplusnow.com/assets/social-img/No-Data-Found-Image.png" alt="No Date Found!" />
          </div>}
      </div>}
    </div>
    )
}

export default Log