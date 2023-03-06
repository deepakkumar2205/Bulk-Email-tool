import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Context from '../../Context/Context';
import exampleExcel from '../../assets/exampleExcel.png'

function ExcelExampleModal() {
  const contextData = useContext(Context);
  const handleClose = () =>contextData.setExampleModalOfExcel(false);
  return (
    <>
      <Modal
        show={contextData.exampleModalOfExcel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        scrollable={true}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Excel File Example Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Note:</h5>
            <ul>
                <li>Excel file data should be like this as shown below</li>
            </ul>
         <img src={exampleExcel} alt="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExcelExampleModal