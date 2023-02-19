import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditModal = (props) => {
  const [savedata,setSaveData] = useState({
    Sr_No: "",
    Academic_Year: "",
    Data_Submitting_Author_department: "",
    Data_Submitting_Author_name: "",
    First_Author_name: "",
    First_Author_department: "",
    First_Author_organization: "",
    Names_of_Other_Author_From_DDU: "",
    Names_of_Other_Author_From_other_Organization: "",
    Title_of_Research_Paper: "",
    Publication_Level: "",
    Journal_title: "",
    Journal_publisher: "",
    Link: "",
    Publication_Date_DD_MM_YYYY: "",
    Month_Number: "",
    Year: "",
    Volume: "",
    Number: "",
    Pages_xx_yy: "",
    DOI: "",
    ISSN_Print: "",
    ISSN_Online: "",
    Impact_Factor_Value: "",
    Impact_Factor_Year: "",
    Impact_Factor_Agency: "",
  }); 

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setSaveData({
      ...savedata,
      [name]: value,
    });
    
  };
  
  const rest = Object.entries(props.data).map(([key, value]) =>{
    if (key !== "_id" && key !== "__v") {
      setSaveData({
        ...savedata,
        [key]: value,
      });
    }
  })
  
  const list = Object.entries(props.data).map(([key, value]) => {
    
    if (key !== "_id" && key !== "__v")
      return (
        <p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{key}</Form.Label>
            {key === "Sr_No" ? (
              <Form.Control
                type="text"
                name={key}
                defaultValue={value}
                disabled
              />
            ) : (
              <Form.Control
                type="text"
                name={key}
                defaultValue={value}
                onChange={ handleChange }
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
              console.log(savedata)
              props.saveChanges(savedata);
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
