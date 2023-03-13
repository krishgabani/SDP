
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { userAll } from "../redux/features/userSlice";

const EditProfileModal = (props) => {
  const { user } = useSelector((state) => state.user);
  const [newData, setNewData] = useState({});
  //console.log(user);
  //console.log(newData);
  const designationList = ["Profecser","Assistents-professor","hod","coordinator"]
  const designationListHtml = designationList.map((value) => <option>{value}</option>)
  useEffect(() => {
    setNewData({
      Id:props.data?._id,
      Name : props.data?.name,
      Email : props.data?.email,
      Designation : props.data?.Designation,
    });
    // console.log("djksnbankujfd");
  }, [props]);

  useEffect(() => {
    console.log(newData);
  }, [newData]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    //console.log(value);
    console.log("joejjre");
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  if(!user)  return(<></>);
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
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Name</Form.Label><Form.Control type="text" name="Name" value={newData.name} defaultValue={props.data.name} onChange={handleChange}/></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Email</Form.Label><Form.Control type="text" name="Email" value={newData.email} defaultValue={props.data.email} onChange={handleChange}></Form.Control></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Designation</Form.Label><Form.Select type="text" name="Designation" value={newData.Designation} defaultValue={props.data.Designation} onChange={handleChange}> {designationListHtml}</Form.Select></Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(newData);
              props.savechanges(newData);
              props.onHide();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProfileModal