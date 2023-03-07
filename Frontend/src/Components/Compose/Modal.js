import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Context from '../../Context/Context';

function PreviewModal(props) {
  const contextData = useContext(Context);
  const handleClose = () =>contextData.setComposeRecepiantModal(false);
  return (
    <>
      <Modal
        show={contextData.composeRecepiantModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview of Recepiants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Total Email's : {props.recepaintInfo.total}</h5>
            <h5>Duplicates : {props.recepaintInfo.duplicates}</h5>
            <h5>Without Duplicates : {props.recepaintInfo.withoutDuplicates}</h5>
            <hr />
          <ol>
            {props.recepaintInfo.data.map((email,inx)=>{
                return <li key={`${inx}`}>{email}</li>
            })}
          </ol>
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

export default PreviewModal