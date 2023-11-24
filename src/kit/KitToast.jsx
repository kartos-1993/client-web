import { Toast, ToastContainer } from "react-bootstrap"
import React from 'react'

const KitToast = ({name, show, setShow}) => {
  return (
    <ToastContainer position="top-end">
      <Toast onClose={() => setShow(!show)} show={show} delay={3000} autohide>
        <Toast.Header>
          <em>{`${name} `}</em> <span>has been created</span>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        </Toast.Header>
        {/* <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body> */}
      </Toast>
    </ToastContainer>
  );
}

export default KitToast

