import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import KitSpinner from "./KitSpinner";

useNavigate;
const KitModal = ({ show, setShow, title, children, loading, path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    return () => {};
  }, []);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onExited = {() => navigate(path)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default KitModal;
