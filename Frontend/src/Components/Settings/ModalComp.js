import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Modalcomp(props) {
  
  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{width:"100%"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to generate App password for your Email are shown:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Steps: </h4>
        <ol>
          <li>Go to <a href="https://myaccount.google.com">https://myaccount.google.com</a></li>
          <li>Click <b>Security</b> on your left side tab.</li>
          <li>Click <b>2-Step Verification</b> on below "Sign in to Google topic"</li>
          <li>After that Generate Otp,Enter Otp into the input box, hit Enter and complete the two step verification. </li>
          <li>Come back to the <a href="https://myaccount.google.com/security">https://myaccount.google.com/security</a> page.</li>
          <li>Click App passwords below the 2-Step verification now.</li>
          <li>Now it ask you what type of app or device you want to generate the app password in that type some thing what you want related to our App. <b>Eg:Bulk Email</b></li>
          <li>Then hit generate button.</li>
          <li>Now it show 12 digit generate app password copy and past it in our website settings password</li>
          <li>Finally, Compose mail and send from your email id what you set in settings.</li>
        </ol>
        <h4>Video Tutorial: </h4>
        <iframe src="https://drive.google.com/file/d/1c06YYYKA1nUOfbdRYUPzq9nHYLfkyzTR/preview" width="100%" height="480" allow="autoplay" ></iframe>
        <br />
        <br />
        <h4>Note:</h4>
        <ul>
          <li>Above tutorial is for gmail users only.</li>
          <li>You are using another mail service create app password like this in your email provider.</li>
          <li>You can delete and update this settings when ever you want.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>props.onHide()}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}


export default Modalcomp