import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Context from '../../Context/Context';
import logo from './mail.png';
import './Navbar.css';

function NavComp() {
  
  const navigate = useNavigate();
  const contextData = useContext(Context);

  function handleLogout() {
      localStorage.clear();
      contextData.setNavFlag(false)
      navigate('/login')
    }
 

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className=''>
          <Navbar.Brand   onClick={()=>navigate('/')} className=''>
                <img src={logo} alt="" className='imageStyle' />  
            <b>Bulk Email Tool</b>
          </Navbar.Brand>
         {contextData.navFlag?<> <Nav className="me-auto">
            <Nav.Link   onClick={()=>navigate('/')} >Home</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/compose')} >Compose</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/graph')} >Graph</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/log')} >Log</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/settings')} >Settings</Nav.Link>
          </Nav>
            <Button variant='secondary' onClick={handleLogout}>LogOut</Button></>
          : <><Nav className="me-auto">
        </Nav>
          </>}
        </Container>
      </Navbar>
    </>
  );
}

export default NavComp;