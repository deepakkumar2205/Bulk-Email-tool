import React, { useEffect, useState } from 'react';
import Context from './Context'

const Provider = (props) => {
    const [ navFlag ,setNavFlag ] = useState(false);

    useEffect(()=>{
      if (localStorage.getItem("x-Auth-token")) {
            setNavFlag(true);
          }
    },[])

  return (
    <Context.Provider value={{
        navFlag,
        setNavFlag
    }}>
        {props.children}
    </Context.Provider>
  )
}

export default Provider