import React, { useEffect, useState } from 'react';
import Context from './Context'

const Provider = (props) => {
    const [ navFlag ,setNavFlag ] = useState(false);
    const [ composeRecepiantModal, setComposeRecepiantModal ] = useState(false) ;
    const [ exampleModalOfExcel, setExampleModalOfExcel ] = useState(false) ;

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
        setExampleModalOfExcel
    }}>
        {props.children}
    </Context.Provider>
  )
}

export default Provider