import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ConferenceModal = (props) => {
  const { user } = useSelector((state) => state.user);
  const [newData, setNewData] = useState({});
  const [departmentList,setDepartmentList] = useState([]);
  const [yearList,setYearList] = useState(["2016-2017","2017-2018","2018-2019","2019-2020"]);

  const yearListHtml = yearList.map((value) => <option>{value}</option>)
  const departmentListHtml = departmentList.map((value) => <option>{value}</option>)

//   useEffect(() => {
//     setNewData({
//         Sr_No:props.data.Sr_No,
//         Academic_Year:props.data.Academic_Year,
//         Data_Submitting_Author_department:props.data.Data_Submitting_Author_department,
//         Data_Submitting_Author_name:props.data.Data_Submitting_Author_name,
//         First_Author_name:props.data.First_Author_name,
//         First_Author_department:props.data.First_Author_department,
//         First_Author_organization:props.data.First_Author_organization,
//         Names_of_Other_Author_From_DDU:props.data.Names_of_Other_Author_From_DDU,
//         Names_of_Other_Author_From_other_Organization:props.data.Names_of_Other_Author_From_other_Organization,
//         Publication_Type:props.data.Publication_Type,
//         Title_of_Research_Paper:props.data.Title_of_Research_Paper,
//         Publication_Level:props.data.Publication_Level,
//         Title_of_the_conference:props.data.Title_of_the_conference,
//         Start_Date_DD_MM_YYYY:props.data.Start_Date_DD_MM_YYYY,
//         End_Date_DD_MM_YYYY:props.data.End_Date_DD_MM_YYYY,
//         Conference_Name:props.data.Conference_Name,
//         Conference_Organizer:props.data.Conference_Organizer,
//         Conference_City:props.data.Conference_City,
//         Conference_State:props.data.Conference_State,
//         Conference_Country:props.data.Conference_Country,
//         Name_of_the_Publisher:props.data.Name_of_the_Publisher,
//         Publication_Date_DD_MM_YYYY:props.data.Publication_Date_DD_MM_YYYY,
//         Pages_xx_yy:props.data.Pages_xx_yy,
//         DOI:props.data.DOI,
//         ISBN_or_ISSN:props.data.ISBN_or_ISSN,
//         Affiliating_Institute_at_the_time_of_publication:props.data.Affiliating_Institute_at_the_time_of_publication,
//     });
//     // console.log("djksnbankujfd");
//   }, [props]);

  useEffect(() => {
    try{
        const getdepartmentlist = async () => {
            const res = await axios.post("http://localhost:5000/api/user/getdepartment");
            let deplist = res.data.data;
            let mylist = deplist.map((dep)=>dep.department)
            setDepartmentList(mylist);
          };
          getdepartmentlist();
    }catch(error){
        console.log(error);
    }

  }, []);

  useEffect(() => {
    console.log(newData);
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
  if(!user)  return(<></>);

  return (
    <> 
      <Modal
        dialogClassName="modal-width"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Conference Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Sr No</Form.Label><Form.Control type="text" name="Sr_No" value={newData.Sr_No} defaultValue={newData.Sr_No} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Year</Form.Label><Form.Select type="text" name="Academic_Year" value={newData.Academic_Year} defaultValue={newData.Academic_Year} onChange={handleChange} >{yearListHtml}</Form.Select></Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Academic Year</Form.Label><Form.Control type="text" name="Academic_Year" value={newData.Academic_Year} defaultValue={newData.Academic_Year} onChange={handleChange} /></Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Data Submitting Author department</Form.Label><Form.Select type="text" name="Data_Submitting_Author_department" value={newData.Data_Submitting_Author_department} defaultValue={departmentList[0]} onChange={handleChange}> {departmentListHtml}</Form.Select></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>DOI</Form.Label><Form.Control type="text" name="DOI" value={newData.DOI} defaultValue={newData.DOI} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Data Submitting Author name</Form.Label><Form.Control type="text" name="Data_Submitting_Author_name" value={newData.Data_Submitting_Author_name} defaultValue={newData.Data_Submitting_Author_name} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author name</Form.Label><Form.Control type="text" name="First_Author_name" value={newData?.First_Author_name} defaultValue={newData.First_Author_name} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author department</Form.Label><Form.Control type="text" name="First_Author_department" value={newData.First_Author_department} defaultValue={newData.First_Author_department} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author organization</Form.Label><Form.Control type="text" name="First_Author_organization" value={newData.First_Author_organization} defaultValue={newData.First_Author_organization} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Names of Other Author From DDU (separated by "; ")</Form.Label><Form.Control type="text" name="Names_of_Other_Author_From_DDU" value={newData.Names_of_Other_Author_From_DDU} defaultValue={newData.Names_of_Other_Author_From_DDU} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Names of Other Author From other Organization (separated by "; ")</Form.Label><Form.Control type="text" name="Names_of_Other_Author_From_other_Organization" value={newData.Names_of_Other_Author_From_other_Organization} defaultValue={   newData.Names_of_Other_Author_From_other_Organization} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Publication Type</Form.Label><Form.Control type="text" name="Publication_Type" value={newData.Publication_Type} defaultValue={"Conference"} onChange={handleChange} disabled/></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Title of Research Paper</Form.Label><Form.Control type="text" name="Title_of_Research_Paper" value={newData.Title_of_Research_Paper} defaultValue={newData.Title_of_Research_Paper} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Publication Level</Form.Label><Form.Control type="text" name="Publication_Level" value={newData.Publication_Level} defaultValue={newData.Publication_Level} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Title of the conference</Form.Label><Form.Control type="text" name="Title_of_the_conference" value={newData.Title_of_the_conference} defaultValue={newData.Title_of_the_conference} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Start Date (DD-MM-YYYY)</Form.Label><Form.Control type="text" name="Start_Date_DD_MM_YYYY" value={newData.Start_Date_DD_MM_YYYY} defaultValue={newData.Start_Date_DD_MM_YYYY} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>End Date (DD-MM-YYYY)</Form.Label><Form.Control type="text" name="End_Date_DD_MM_YYYY" value={newData.End_Date_DD_MM_YYYY} defaultValue={newData.End_Date_DD_MM_YYYY} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Conference Name</Form.Label><Form.Control type="text" name="Conference_Name" value={newData.Conference_Name} defaultValue={newData.Conference_Name} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Conference Organizer</Form.Label><Form.Control type="text" name="Conference_Organizer" value={newData.Conference_Organizer} defaultValue={newData.Conference_Organizer} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Conference City</Form.Label><Form.Control type="text" name="Conference_City" value={newData.Conference_City} defaultValue={newData.Conference_City} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Conference State</Form.Label><Form.Control type="text" name="Conference_State" value={newData.Conference_State} defaultValue={newData.Conference_State} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Conference Country</Form.Label><Form.Control type="text" name="Conference_Country" value={newData.Conference_Country} defaultValue={newData.Conference_Country} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Name of the Publisher</Form.Label><Form.Control type="text" name="Name_of_the_Publisher" value={newData.Name_of_the_Publisher} defaultValue={newData.Name_of_the_Publisher} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Publication Date (DD-MM-YYYY)</Form.Label><Form.Control type="text" name="Publication_Date_DD_MM_YYYY" value={newData.Publication_Date_DD_MM_YYYY} defaultValue={newData.Publication_Date_DD_MM_YYYY} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Pages (xx-yy)</Form.Label><Form.Control type="text" name="Pages_xx_yy" value={newData.Pages_xx_yy} defaultValue={newData.Pages_xx_yy} onChange={handleChange} /></Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>ISBN or ISSN</Form.Label><Form.Control type="text" name="ISBN_or_ISSN" value={newData.ISBN_or_ISSN} defaultValue={newData.ISBN_or_ISSN} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Affiliating Institute at the time of publication</Form.Label><Form.Control type="text" name="Affiliating_Institute_at_the_time_of_publication" value={newData.Affiliating_Institute_at_the_time_of_publication} defaultValue={newData.Affiliating_Institute_at_the_time_of_publication} onChange={handleChange} /></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setNewData({}); props.onHide(); }}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(newData);
              props.addConference(newData);
              setNewData({});
              props.onHide();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ConferenceModal;