import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const Log = () => {
  return (
    <Container className='m-4'>

    <Nav fill variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-1">Manual</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Large File Upload Mail</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      </Nav.Item>
    </Nav>
    </Container>
    )
}

export default Log