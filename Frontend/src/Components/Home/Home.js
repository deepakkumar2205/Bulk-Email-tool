import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import hi from '../../assets/waving-hi.gif'
import { getMailsCountAxios, getQuoteAxios, verifyTokenAxios } from '../../Services/axios'
import { defaultToast, errorToast } from '../../Services/tostify'

const Home = () => {
  const navigate= useNavigate();
  const [flag ,setFlag ] = useState(true)
  const [count,setCount] = useState({count:0,name:''});
  const [quote,setQuote] = useState({author:"Ann Landers",quote:"It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings."})

  useEffect(()=>{
    if(flag){
      verifyTokenAxios()
      .then((res)=>{
        if(res.status === 200){
          // defaultToast("Welcome")
          setFlag(false)
        }
      })
      .catch((err)=>{
        console.log(err);
        if(err.code === "ERR_NETWORK"){
          errorToast("Check your Internet Connection")
        }
        if(err.response.status === 401){
          navigate("/login")
          localStorage.clear()
          errorToast("Something Went Wrong")
        }
      })
    }
    getMailsCountAxios()
    .then((res)=>setCount(res.data))
    .catch((err)=>console.log(err))

    fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(res=>setQuote(res));
            
    },[])

  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap' style={{height:'80vh'}}>
      <img src="https://img.freepik.com/premium-vector/flat-design-icon-postman_362714-180.jpg?w=2000" alt="Home" style={{width:"400px",height:"400px"}}/>
      <div className=" " style={{height:"400px",width:"400px"}}>
          <div style={{width:"400px"}}>
            <h3 className='w-100 ' > <img src={hi} alt="" style={{height:"40px",width:"40px"}} /> Hi, {count.name} !</h3>
          </div>
          <div>
          <Card style={{ width: '' }} className="text-start">
            <Card.Body>
              <Card.Title className='d-flex'>Today <span className='ms-auto'>{new Date().toLocaleDateString()}</span></Card.Title>
              <hr/>
              <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Email Sent <span className='ms-auto me-5 '>{count.count}</span></Card.Subtitle>
              <br/>
              {/* <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Total <span className='ms-auto me-5 '>0</span></Card.Subtitle> */}
             <hr />
              <Card.Text>
                <q>{quote.quote}</q>
                <br />
                <br />
                <p className='text-end'><b>-{quote.author}</b></p>
              </Card.Text>
            </Card.Body>
          </Card>
    </div>
      </div>
    </div>
  )
}

export default Home