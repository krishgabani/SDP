import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import "../styles/ViewModal.css";

const EditModal = (props) => {
  const { user } = useSelector((state) => state.user);
  const [newData, setNewData] = useState([]);
  const [departmentList,setDepartmentList] = useState([]);
  const [yearList,setYearList] = useState(["2016-2017","2017-2018","2018-2019","2019-2020"]);
  const monthsList = ["1","2","3","4","5","6","7","8","9","10","11","12"]

  const yearListHtml = yearList.map((value) => <option>{value}</option>)
  const departmentListHtml = departmentList.map((value) => <option>{value}</option>)
  const monthsListHtml = monthsList.map((value) => <option>{value}</option>)

  useEffect(() => {
    const getdepartmentlist = async () => {
      const res = await axios.post("http://localhost:5000/api/user/getdepartment");
      let deplist = res.data.data;
      let mylist = deplist.map((dep)=>dep.department)
      setDepartmentList(mylist);
    };
    getdepartmentlist();
  }, []);

  useEffect(() => {
    console.log(newData);
  }, [newData]);

  const handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let res = "";
    let resMsg = {
      "DOI":"",
      "Title_of_Research_Paper": "",
      "Number": "",
      "Pages_xx_yy": "",
      "Volume": "",
      "ISSN_Print": "",
      "First_Author_name" : "",
      // "Names_of_Other_Author_From_DDU" : otherAuthorsFromDDU,
      // "Names_of_Other_Author_From_other_Organization" : otherAuthors,
      "Year" : "",
      "month": "",
      // "affiliation" : data?.author[0]?.affiliation[0]?.name,
      "Journal_publisher" : "",
      "Publication_Level" : ""
    }
    if(name === "DOI")  {
        res = await axios.post("http://localhost:5000/info/getapiData",{DOI:value});
        const temp = res.data?.data
        console.log(res.data?.data);
        if(res.data.success) {
          setNewData(temp);
        }else{
          console.log('hi')
          setNewData({
            ...resMsg,
            [name]: name==="DOI" ? value : "",
          }); 
        }
    }else{
      setNewData({
        ...newData,
        [name]:value
      })
    }
  };

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
            Add New Journal Pepar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Sr No</Form.Label><Form.Control type="text"  name="Sr_No" value={newData.Sr_No} onChange={handleChange}/></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Year</Form.Label><Form.Select type="text" name="Academic_Year" value={newData.Academic_Year} onChange={handleChange} >{yearListHtml}</Form.Select></Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Academic Year</Form.Label><Form.Control type="text" name="Academic_Year" value={newData.Academic_Year} onChange={handleChange} /></Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Data Submitting Author department</Form.Label><Form.Select type="text" name="Data_Submitting_Author_department" value={newData.Data_Submitting_Author_department} onChange={handleChange}> {departmentListHtml}</Form.Select></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>DOI</Form.Label><Form.Control type="text" name="DOI" value={newData.DOI} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Data Submitting Author name</Form.Label><Form.Control type="text" name="Data_Submitting_Author_name" value={newData.Data_Submitting_Author_name} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author name</Form.Label><Form.Control type="text" name="First_Author_name" value={newData.First_Author_name} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author department</Form.Label><Form.Control type="text" name="First_Author_department" value={newData.First_Author_department} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>First Author organization</Form.Label><Form.Control type="text" name="First_Author_organization" value={newData.First_Author_organization} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Names of Other Author From DDU (separated by "; ")</Form.Label><Form.Control type="text" name="Names_of_Other_Author_From_DDU" value={newData.Names_of_Other_Author_From_DDU} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Names of Other Author From other Organization (separated by "; ")</Form.Label><Form.Control type="text" name="Names_of_Other_Author_From_other_Organization" value={newData.Names_of_Other_Author_From_other_Organization} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Title of Research Paper</Form.Label><Form.Control type="text" name="Title_of_Research_Paper" value={newData.Title_of_Research_Paper} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Publication Level</Form.Label><Form.Control type="text" name="Publication_Level" value={newData.Publication_Level} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Journal title</Form.Label><Form.Control type="text" name="Journal_title" value={newData.Journal_title} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Journal publisher</Form.Label><Form.Control type="text" name="Journal_publisher" value={newData.Journal_publisher} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Link to the recognition in UGC enlistment of the Journal</Form.Label><Form.Control type="text" name="Link" value={newData.Link} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Publication Date (DD-MM-YYYY)</Form.Label><Form.Control type="text" name="Publication_Date_DD_MM_YYYY" value={newData.Publication_Date_DD_MM_YYYY} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Month Number</Form.Label><Form.Select type="text" name="Month_Number" value={newData.Month_Number} onChange={handleChange}>{monthsListHtml}</Form.Select></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Year</Form.Label><Form.Control type="text" name="Year" value={newData.Year} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Volume</Form.Label><Form.Control type="text" name="Volume" value={newData.Volume} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Number</Form.Label><Form.Control type="text" name="Number" value={newData.Number} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Pages (xx-yy)</Form.Label><Form.Control type="text" name="Pages_xx_yy" value={newData.Pages_xx_yy} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>ISSN (Print)</Form.Label><Form.Control type="text" name="ISSN_Print" value={newData.ISSN_Print} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>ISSN (Online)</Form.Label><Form.Control type="text" name="ISSN_Online" value={newData.ISSN_Online} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Impact Factor Value</Form.Label><Form.Control type="text" name="Impact_Factor_Value" value={newData.Impact_Factor_Value} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Impact Factor Year</Form.Label><Form.Control type="text" name="Impact_Factor_Year" value={newData.Impact_Factor_Year} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"><Form.Label>Impact Factor Agency</Form.Label><Form.Control type="text" name="Impact_Factor_Agency" value={newData.Impact_Factor_Agency} onChange={handleChange} /></Form.Group>
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
              props.addJournal(newData);
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
export default EditModal;

