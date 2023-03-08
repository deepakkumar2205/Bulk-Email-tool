import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Context from '../../Context/Context';

function TableComp() {
    const contextData = useContext(Context) ;

  return (
    <Table striped className='text-start ' style={{overflowX:"auto"}}>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Date(Day Month Date Year)</th>
          <th>Time</th>
          <th>Enveloped Email</th>
          <th>Total Emails</th>
          <th>Success</th>
          <th>Rejected</th>
          <th>Subject</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody>
        {contextData.logData.map((data,inx)=>{
            return <tr>
                    <td>{inx+1}</td>
                    <td>{new Date(data.time).toDateString()}</td>
                    <td>{new Date(data.time).toLocaleTimeString()}</td>
                    <td>{data.from}</td>
                    <td>{data.to.length}</td>
                    <td>{data.accepted.length}</td>
                    <td>{data.rejected.length}</td>
                    <td>{data.subject}</td>
                    <td><Button size='sm '>info</Button></td>
                </tr>
        })}
       
      </tbody>
    </Table>
  );
}

export default TableComp;