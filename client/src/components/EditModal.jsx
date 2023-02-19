import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditModal = (props) => {
  const list = Object.entries(props.data).map(([key, value]) => {
    if (key !== "_id" && key !== "__v")
      return (
        <p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{key}</Form.Label>
            {key === "Sr_No" ? (
              <Form.Control
                type="text"
                placeholder="name@example.com"
                defaultValue={value}
                // onChange={handleChange}
                disabled
              />
            ) : (
              <Form.Control
                type="text"
                placeholder="name@example.com"
                defaultValue={value}
              />
            )}
          </Form.Group>
        </p>
      );
  });
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data.Title_of_Research_Paper}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{list}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.saveChanges(props.data);
              props.onHide();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditModal;
