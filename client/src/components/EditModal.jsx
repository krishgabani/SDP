import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditModal = (props) => {
  const [newData, setNewData] = useState({});

  useEffect(() => {
    setNewData({
      Sr_No: props.data.Sr_No,
      Academic_Year: props.data.Academic_Year,
      Data_Submitting_Author_department:
        props.data.Data_Submitting_Author_department,
      Data_Submitting_Author_name: props.data.Data_Submitting_Author_name,
      First_Author_name: props.data.First_Author_name,
      First_Author_department: props.data.First_Author_department,
      First_Author_organization: props.data.First_Author_organization,
      Names_of_Other_Author_From_DDU: props.data.Names_of_Other_Author_From_DDU,
      Names_of_Other_Author_From_other_Organization:
        props.data.Names_of_Other_Author_From_other_Organization,
      Title_of_Research_Paper: props.data.Title_of_Research_Paper,
      Publication_Level: props.data.Publication_Level,
      Journal_title: props.data.Journal_title,
      Journal_publisher: props.data.Journal_publisher,
      Link: props.data.Link,
      Publication_Date_DD_MM_YYYY: props.data.Publication_Date_DD_MM_YYYY,
      Month_Number: props.data.Month_Number,
      Year: props.data.Year,
      Volume: props.data.Volume,
      Number: props.data.Number,
      Pages_xx_yy: props.data.Pages_xx_yy,
      DOI: props.data.DOI,
      ISSN_Print: props.data.ISSN_Print,
      ISSN_Online: props.data.ISSN_Online,
      Impact_Factor_Value: props.data.Impact_Factor_Value,
      Impact_Factor_Year: props.data.Impact_Factor_Year,
      Impact_Factor_Agency: props.data.Impact_Factor_Agency,
    });
   // console.log("djksnbankujfd");
  }, [props]);

  useEffect(() => {
    //console.log(newData);
  }, [newData]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  // const list = Object.entries(props.data).map(([key, value]) => {
  //   if (key !== "_id" && key !== "__v")
  //     return (
  //       <p>
  //         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  //           <Form.Label>{key}</Form.Label>
  //           {key === "Sr_No" ? (
  //             <Form.Control type="text" defaultValue={value} disabled />
  //           ) : (
  //             <Form.Control
  //               type="text"
  //               onChange={handleChange}
  //               defaultValue={value}
  //             />
  //           )}
  //         </Form.Group>
  //       </p>
  //     );
  // });
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sr_No</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.data.Sr_No}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Academic_Year</Form.Label>
              <Form.Control
                type="text"
                name="Academic_Year"
                value={newData.Academic_Year}
                defaultValue={props.data.Academic_Year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Data_Submitting_Author_department</Form.Label>
              <Form.Control
                type="text"
                name="Data_Submitting_Author_department"
                value={newData.Data_Submitting_Author_department}
                defaultValue={props.data.Data_Submitting_Author_department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Data_Submitting_Author_name</Form.Label>
              <Form.Control
                type="text"
                name="Data_Submitting_Author_name"
                value={newData.Data_Submitting_Author_name}
                defaultValue={props.data.Data_Submitting_Author_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First_Author_name</Form.Label>
              <Form.Control
                type="text"
                name="First_Author_name"
                value={newData.First_Author_name}
                defaultValue={props.data.First_Author_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First_Author_department</Form.Label>
              <Form.Control
                type="text"
                name="First_Author_department"
                value={newData.First_Author_department}
                defaultValue={props.data.First_Author_department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First_Author_organization</Form.Label>
              <Form.Control
                type="text"
                name="First_Author_organization"
                value={newData.First_Author_organization}
                defaultValue={props.data.First_Author_organization}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Names_of_Other_Author_From_DDU</Form.Label>
              <Form.Control
                type="text"
                name="Names_of_Other_Author_From_DDU"
                value={newData.Names_of_Other_Author_From_DDU}
                defaultValue={props.data.Names_of_Other_Author_From_DDU}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Names_of_Other_Author_From_other_Organization
              </Form.Label>
              <Form.Control
                type="text"
                name="Names_of_Other_Author_From_other_Organization"
                value={newData.Names_of_Other_Author_From_other_Organization}
                defaultValue={
                  props.data.Names_of_Other_Author_From_other_Organization
                }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title_of_Research_Paper</Form.Label>
              <Form.Control
                type="text"
                name="Title_of_Research_Paper"
                value={newData.Title_of_Research_Paper}
                defaultValue={props.data.Title_of_Research_Paper}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Publication_Level</Form.Label>
              <Form.Control
                type="text"
                name="Publication_Level"
                value={newData.Publication_Level}
                defaultValue={props.data.Publication_Level}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Journal_title</Form.Label>
              <Form.Control
                type="text"
                name="Journal_title"
                value={newData.Journal_title}
                defaultValue={props.data.Journal_title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Journal_publisher</Form.Label>
              <Form.Control
                type="text"
                name="Journal_publisher"
                value={newData.Journal_publisher}
                defaultValue={props.data.Journal_publisher}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="Link"
                value={newData.Link}
                defaultValue={props.data.Link}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Publication_Date_DD_MM_YYYY</Form.Label>
              <Form.Control
                type="text"
                name="Publication_Date_DD_MM_YYYY"
                value={newData.Publication_Date_DD_MM_YYYY}
                defaultValue={props.data.Publication_Date_DD_MM_YYYY}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Month_Number</Form.Label>
              <Form.Control
                type="text"
                name="Month_Number"
                value={newData.Month_Number}
                defaultValue={props.data.Month_Number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="Year"
                value={newData.Year}
                defaultValue={props.data.Year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type="text"
                name="Volume"
                value={newData.Volume}
                defaultValue={props.data.Volume}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="Number"
                value={newData.Number}
                defaultValue={props.data.Number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pages_xx_yy</Form.Label>
              <Form.Control
                type="text"
                name="Pages_xx_yy"
                value={newData.Pages_xx_yy}
                defaultValue={props.data.Pages_xx_yy}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>DOI</Form.Label>
              <Form.Control
                type="text"
                name="DOI"
                value={newData.DOI}
                defaultValue={props.data.DOI}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ISSN_Print</Form.Label>
              <Form.Control
                type="text"
                name="ISSN_Print"
                value={newData.ISSN_Print}
                defaultValue={props.data.ISSN_Print}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ISSN_Online</Form.Label>
              <Form.Control
                type="text"
                name="ISSN_Online"
                value={newData.ISSN_Online}
                defaultValue={props.data.ISSN_Online}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Impact_Factor_Value</Form.Label>
              <Form.Control
                type="text"
                name="Impact_Factor_Value"
                value={newData.Impact_Factor_Value}
                defaultValue={props.data.Impact_Factor_Value}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Impact_Factor_Year</Form.Label>
              <Form.Control
                type="text"
                name="Impact_Factor_Year"
                value={newData.Impact_Factor_Year}
                defaultValue={props.data.Impact_Factor_Year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Impact_Factor_Agency</Form.Label>
              <Form.Control
                type="text"
                name="Impact_Factor_Agency"
                value={newData.Impact_Factor_Agency}
                defaultValue={props.data.Impact_Factor_Agency}
                onChange={handleChange}
              />
            </Form.Group>
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
              //console.log(newData);
              props.savechanges(newData);
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

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";

// const EditModal = (props) => {
//   const [savedata, setSaveData] = useState({
//     Sr_No: props.data.Sr_No,
//     Academic_Year: props.data.Academic_Year,
//     Data_Submitting_Author_department:
//       props.data.Data_Submitting_Author_department,
//     Data_Submitting_Author_name: props.data.Data_Submitting_Author_name,
//     First_Author_name: props.data.First_Author_name,
//     First_Author_department: props.data.First_Author_department,
//     First_Author_organization: props.data.First_Author_organization,
//     Names_of_Other_Author_From_DDU: props.data.Names_of_Other_Author_From_DDU,
//     Names_of_Other_Author_From_other_Organization:
//       props.data.Names_of_Other_Author_From_other_Organization,
//     Title_of_Research_Paper: props.data.Title_of_Research_Paper,
//     Publication_Level: props.data.Publication_Level,
//     Journal_title: props.data.Journal_title,
//     Journal_publisher: props.data.Journal_publisher,
//     Link: props.data.Link,
//     Publication_Date_DD_MM_YYYY: props.data.Publication_Date_DD_MM_YYYY,
//     Month_Number: props.data.Month_Number,
//     Year: props.data.Year,
//     Volume: props.data.Volume,
//     Number: props.data.Number,
//     Pages_xx_yy: props.data.Pages_xx_yy,
//     DOI: props.data.DOI,
//     ISSN_Print: props.data.ISSN_Print,
//     ISSN_Online: props.data.ISSN_Online,
//     Impact_Factor_Value: props.data.Impact_Factor_Value,
//     Impact_Factor_Year: props.data.Impact_Factor_Year,
//     Impact_Factor_Agency: props.data.Impact_Factor_Agency,
//   });

//   const handleChange = (e) => {
//     console.log(e);
//     const { name, value } = e.target;
//     setSaveData({
//       ...savedata,
//       [name]: value,
//     });
//   };

//   const list = Object.entries(props.data).map(([key, value]) => {
//     if (key !== "_id" && key !== "__v")
//       return (
//         <p>
//           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>{key}</Form.Label>
//             {key === "Sr_No" ? (
//               <Form.Control
//                 type="text"
//                 name={key}
//                 defaultValue={value}
//                 disabled
//               />
//             ) : (
//               <Form.Control
//                 type="text"
//                 name={key}
//                 defaultValue={value}
//                 onChange={handleChange}
//               />
//             )}
//           </Form.Group>
//         </p>
//       );
//   });
//   return (
//     <>
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             {props.data.Title_of_Research_Paper}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>{list}</Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={props.onHide}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => {
//               console.log(savedata);
//               props.saveChanges(savedata);
//               props.onHide();
//             }}
//           >
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };
// export default EditModal;
