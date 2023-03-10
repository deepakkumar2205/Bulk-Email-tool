import React from 'react'
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'

const Info = () => {
    const data = useLocation();
    const objData = data.state
    const navigate = useNavigate();
    console.log(data.state);
    
    const composeObj = {
        emails:objData.to.join(','),
        subject:objData.subject,
        htmlTemplate:objData.htmlTemplate
    }
  return (
    <div className='container mt-5'>
        <div className="mb-3">
            <Button className='btn btn-secondary' onClick={()=>navigate(-1)}>Back</Button>
        </div>
        <div className=''>
            <h3>Information:</h3>
            <hr />
            <div className=" p-3">
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Date and Time</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{new Date(objData.time).toLocaleString()}</p></div>
                </div> 
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Send From</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{objData.from}</p></div>
                </div> 
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Send To (Count)</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{objData.to.length} Mails</p></div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Send To</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{maxHeight:'100px', overflow:"scroll",width:"40%" ,overflowX:"hidden"}}>
                        <ol>
                            {objData.to.map((e , inx)=><li key={`${inx}`}>{e}</li>)}
                        </ol>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Successfully Send To (Count)</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{objData.accepted.length} Mails</p></div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Successfully Send To</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{maxHeight:'100px', overflow:"scroll",width:"40%",overflowX:"hidden"}}>
                        <ol>
                            {objData.accepted.map((e , inx)=><li key={`${inx}`}>{e}</li>)}
                        </ol>
                    </div>
                </div>
                {/* // */}
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Rejected Mails (Count)</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{objData.rejected.length} Mails</p></div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Rejected Mails</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{maxHeight:'100px', overflow:"scroll",width:"40%",overflowX:"hidden"}}>
                        {objData.rejected.length ===0 ? <p>null</p> :
                        <ol>
                            {objData.rejected.map((e , inx)=><li key={`${inx}`}>{e}</li>)}
                        </ol>
                        }
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Subject</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='' style={{width:"40%"}}><p>{objData.subject}</p></div>
                </div>
                <div className='d-flex'>
                    <div className='' style={{width:"40%"}}><h6>Content</h6></div>
                    <div className='' style={{width:"20%"}}><h6>:</h6></div>
                    <div className='border p-4 rounded-3' style={{maxHeight:'300px',overflow:"scroll",width:"40%",overflowX:"hidden"}}>
                        <div dangerouslySetInnerHTML={{__html: objData.htmlTemplate}} />
                    </div>
                </div>
            </div>
            <br />
            <Button onClick={()=>navigate('/compose',{state:composeObj})}>Compose Again with above Details</Button>
            <br />
            <br />
        </div>
    </div>
  )
}

export default Info