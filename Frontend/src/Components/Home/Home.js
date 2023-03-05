import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import homeImg from '../../assets/mailHome1.svg'
import hi from '../../assets/waving-hi.gif'
import { verifyTokenAxios } from '../../Services/axios'
import { defaultToast, errorToast } from '../../Services/tostify'

const Home = () => {
  const navigate= useNavigate();
  const [flag ,setFlag ] = useState(true)

  useEffect(()=>{
    if(flag){
      verifyTokenAxios()
      .then((res)=>{
        if(res.status === 200){
          defaultToast("Welcome")
          setFlag(false)
        }
      })
      .catch((err)=>{
        if(err.response.status === 401){
          navigate("/login")
          localStorage.clear()
          errorToast("Something Went Wrong")
        }
      })
    }
    },[])
  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap' style={{height:'80vh'}}>
      <img src="https://img.freepik.com/premium-vector/flat-design-icon-postman_362714-180.jpg?w=2000" alt="Home" style={{width:"400px",height:"400px"}}/>
      <div className=" " style={{height:"400px",width:"400px"}}>
          <div style={{width:"400px"}}>
            <h3 className='w-100 ' > <img src={hi} alt="" style={{height:"40px",width:"40px"}} /> Hi, there !</h3>
          </div>
          <div>
          <Card style={{ width: '' }} className="text-start">
            <Card.Body>
              <Card.Title className='d-flex'>Today <span className='ms-auto'>{new Date().toLocaleDateString()}</span></Card.Title>
              <hr/>
              <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Email Sent <span className='ms-auto me-5 '>0</span></Card.Subtitle>
              <br/>
              <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Total <span className='ms-auto me-5 '>0</span></Card.Subtitle>
             
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
    </div>
      </div>
    </div>
  )
}

export default Home