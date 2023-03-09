import { subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Context from './Context';

const Provider = (props) => {
    const [ navFlag ,setNavFlag ] = useState(false);
    const [ composeRecepiantModal, setComposeRecepiantModal ] = useState(false) ;
    const [ exampleModalOfExcel, setExampleModalOfExcel ] = useState(false) ;
    const [ previewModal, setPreviewModal ] = useState(false) ;
    const [ logData, setLogData ] = useState([]);
    const [timeStamp, setTimeStamp ] = useState([
      {
        startDate: subDays(new Date(), 7),
        endDate: new Date(),
        key: 'selection'
      }
    ]);

    useEffect(()=>{
      if (localStorage.getItem("x-Auth-token")) {
            setNavFlag(true);
          }
    },[])

  return (
    <Context.Provider value={{
        navFlag,
        setNavFlag,
        composeRecepiantModal,
        setComposeRecepiantModal,
        exampleModalOfExcel,
        setExampleModalOfExcel,
        previewModal ,
        setPreviewModal,
        logData,
        setLogData,
        timeStamp ,
        setTimeStamp
    }}>
        {props.children}
    </Context.Provider>
  )
}

export default Provider