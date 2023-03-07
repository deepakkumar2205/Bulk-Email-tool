import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Context from '../../Context/Context';

function PreviewEmailsModals({recepaintInfo}) {
  const contextData = useContext(Context);

  const handleClose = () => contextData.setPreviewModal(false);

  return (

      <Modal
        show={contextData.previewModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Total Email's : {recepaintInfo.length}</h5>
          <ol>
            {recepaintInfo.map((email,inx)=>{
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
  );
}

export default PreviewEmailsModals ;