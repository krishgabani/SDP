import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Conference.css";
import { conferenceData } from "../../../components/Layout/data";
import Layout from "../../../components/Layout/Layout";
import ViewModal from "../../../components/viewModal/ViewModal";
import EditModalConference from "../../../components/EditModalConference";
import ConferenceModal from "../../../components/ConferenceModal"
import { readUploadFile } from "../../../Action/coordinator/excelUpload"
import { sendDataconference, downloadExcel } from "../../../Action/coordinator/excelfilter"
import {getconference,getDOIList} from "../../../Action/coordinator/getdataconference"


function Conference({ cookies, removeCookies }) {
  
  const [jsonData, setJsonData] = useState([]);
  const [jsontableData, setJsontableData] = useState([]);
  const [viewModalShow, setViewModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState([]);
  const [DOIList, setDOIList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [updatechange,setUpdatechange] = useState(false);

  let { user } = useSelector((state) => state.user);
  user = { ...user, currentPage: "Conference" }
  const downloadData = jsontableData;
  downloadData.forEach((it, index) => {
    delete it._id;
    delete it.__v;
  })

  // const excelFileToJSON = (file) => {
  //   try {
  //     const reader = new FileReader();
  //     reader.readAsBinaryString(file);
  //     reader.onload = (e) => {
  //       const data = e.target.result;
  //       //console.log(data);
  //       const workbook = xlsx.read(data, { type: "binary" });
  //       var result = {};

  //       //console.log(workbook);
  //       workbook.SheetNames.forEach(function (sheetName) {
  //         var roa = xlsx.utils.sheet_to_row_object_array(
  //           workbook.Sheets[sheetName]
  //         );
  //         // console.log(roa);
  //         if (roa.length > 0) {
  //           //console.log(roa);
  //           result[sheetName] = roa;
  //         }
  //       });
  //       // console.log(result);
  //       // console.log(result.Sheet1);
  //       setJsonData(result);

  //       // console.log("hellow");
  //     };
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };
  // const readUploadFile = (e) => {
  //   e.preventDefault();
  //   var files = document.getElementById("upload").files;
  //   if (files.length == 0) {
  //     alert("Please choose any file...");
  //     return;
  //   }
  //   var filename = files[0].name;
  //   var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  //   if (extension == ".XLS" || extension == ".XLSX") {
  //     // console.log(files[0]);
  //     excelFileToJSON(files[0]);
  //   } else {
  //     alert("Please select a valid excel file.");
  //   }
  // };

  const UploadFile = (e) => {
    e.preventDefault();
    var files = document.getElementById("upload").files;

    const response = readUploadFile(files);
    if (response.type === 'error') {
      alert(response.message);
    } else {
      setJsonData(response.exceldata)
    }
  };
  // const messageOnDuplicate = (doi, title) => {
  //   toast.info(`Research pepar having doi ${doi} is already in database.`, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // }
  // const deleteDuplicate = () => {
  //   for (let i = jsonData.Sheet1.length - 1; i >= 0; i--) {
  //     if (DOIList.includes(jsonData.Sheet1[i].DOI)) {
  //       messageOnDuplicate(jsonData.Sheet1[i].DOI, jsonData.Sheet1[i].Title_of_Research_Paper);
  //       jsonData.Sheet1.splice(i, 1);
  //     }
  //   }
  // }
  const uploadData = () => {
    // console.log(jsonData.Sheet1);
    // deleteDuplicate();
    // if (jsonData == []) return;
    // axios
    //   .post("http://localhost:5000/info/sendconference", jsonData)
    //   .then((res) => {
    //     console.log("Server response for /sendconference is " + res.data);

    //     toast.success("Conference is uploaded successfuly", {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   });
    sendDataconference(jsonData,DOIList);
  };
  // const downloadExcel = (data, filename) => {
  //   const worksheet = xlsx.utils.json_to_sheet(data);
  //   const workbook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   xlsx.writeFile(workbook, filename);
  // };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getDOIList(user);

      setDOIList(response.condoilist);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getconference(user);
      setJsontableData(response.conferencedata);
    };
    fetchdata();
  }, [updatechange]);

  const savechanges = async (newItem) => {
    const res = await axios.post(
      "http://localhost:5000/info/editconference",
      newItem
    );
    // console.log(res.data);
  };

  const handleSort = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    console.log(jsontableData);
    const sortedData = [...jsontableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setJsontableData(sortedData);
    setSortConfig({ key, direction });
    console.log(jsontableData);
  };

  const deleteJournal = async (item) => {
    console.log(item);

    // Create and style the alert box
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');
    alertBox.innerHTML = `
      <span class="close-btn">&times;</span>
      <p>Are you sure you want to delete ${item}?</p>
      <button class="confirm-btn">Confirm</button>
    `;
  
    // Append the alert box to the document body
    document.body.appendChild(alertBox);
  
    // Add event listener to the confirm button
    const confirmBtn = alertBox.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', async () => {
      const res = await axios.post("http://localhost:5000/info/deleteconference", item);
      console.log(res.data);
      if (res.data.status === '1') {
        setUpdatechange(true);
        // Remove the alert box
        alertBox.remove();
      } else {
        toast.error('error occure in due to server', {
          position: toast.POSITION.TOP_RIGHT,
        });
        // handle error
      }
    });
  
    // Add event listener to the close button
    const closeBtn = alertBox.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      // Remove the alert box
      alertBox.remove();
    });
  }

  const listItems = jsontableData.map((item) => (
    <tr className="font-size-12">
      <th scope="row">{item.Sr_No}</th>
      <td>{item.Academic_Year}</td>
      <td>{item.First_Author_name}</td>
      <td>{item.Title_of_Research_Paper}</td>
      {/* <td>{item.Data_Submitting_Author_name}</td> */}
      {/* <td>{item.Data_Submitting_Author_department}</td>
      <td>{item.Publication_Level}</td>
      <td>{item.First_Author_organization}</td>
      <td>{item.Names_of_Other_Author_From_DDU}</td>
      <td>{item.Names_of_Other_Author_From_other_Organization}</td>
      <td>{item.Publication_Type}</td>
      <td>{item.Publication_Level}</td> */}
      <td>{item.Title_of_the_conference}</td>
      <td>{item.Conference_Name}</td>
      <td>{item.Start_Date_DD_MM_YYYY}</td>
      <td>{item.End_Date_DD_MM_YYYY}</td>
      {/* <td>{item.Conference_Organizer}</td>
      <td>{item.Conference_City}</td>
      <td>{item.Conference_State}</td>
      <td>{item.Conference_Country}</td> */}
      {/* <td>{item.Name_of_the_Publisher}</td> */}
      {/* <td>{item.Publication_Date_DD_MM_YYYY}</td>
      <td>{item.Pages_xx_yy}</td> */}
      <td>{item.DOI}</td>
      {/* <td>{item.ISBN_or_ISSN}</td> */}
      {/* <td>{item.Affiliating_Institute_at_the_time_of_publication}</td> */}
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setViewModalShow(true); setCurrentItem(item); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fa fa-eye" aria-hidden="true"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); setCurrentItem(item); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-edit"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => deleteJournal(item)}> <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-trash"></i> </th>
    </tr>
  ));

  const addConference = async (newItem) => {
    try{
      console.log(newItem);
    }catch(error){
      console.log(error);
      // toast.error("" + res.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });    
    }
  }
  if (!user) return <></>;
  return (
    <Layout removeCookies={removeCookies}>
      <div className="main-container">
        <div className="input-group mt-1 mb-1 border rounded-pill p-1">
          <button type="button" className="btn btn-link">
            <i className="fa fa-search"></i>
          </button>
          <input
            type="search"
            id="searchInput"
            placeholder="What are you searching for?"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-control bg-none border-0 shadow-none"
          />
        </div>
        <div class="scrollit">
          <table  id="journalTable" class="table table-hover table-bordered table-striped table-mymodify">
            <thead>
              <tr>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Sr_No')} scope="col">Sr No. <i className={`fas fa-angle${sortConfig.key === 'Sr_No' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th scope="col">Academic Year</th>
                <th scope="col">First Author</th>
                <th scope="col">Title of Research Paper</th>
                {/* <th scope="col">Data Submitting Author name</th> */}
                {/* <th scope="col">Data Submitting Author department</th>
                <th scope="col">Publication Level</th>
                <th scope="col">First Author organization</th>
                <th scope="col">Names of Other Author From DDU</th>
                <th scope="col">Names of Other Author From other Organization</th>
                <th scope="col">Publication Type</th>
                <th scope="col">Publication Level</th> */}
                <th scope="col">Title of the conference</th>
                <th scope="col">Conference Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                {/* <th scope="col">Conference Organizer</th>
                <th scope="col">Conference City</th>
                <th scope="col">Conference State</th>
                <th scope="col">Conference Country</th> */}
                {/* <th scope="col">Name of the Publisher</th> */}
                {/* <th scope="col">Publication Date (DD-MM-YYYY)</th>
                <th scope="col">Pages xx yy</th> */}
                <th scope="col">DOI</th>
                {/* <th scope="col">ISBN or ISSN</th> */}
                {/* <th scope="col">Affiliating Institute </th> */}
                <th >
                  <div className="journal-addbtn-parent main-container">
                    <button className="btn btn-primary journal-addbtn  mt-1 mb-2" onClick={() => setAddModalShow(true)}> Add </button>
                  </div>
                </th>
              </tr>

            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
        <ViewModal
          show={viewModalShow}
          onHide={() => setViewModalShow(false)}
          data={currentItem}
        />
        <EditModalConference
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          savechanges={savechanges}
          data={currentItem}
        />
       <ConferenceModal show={addModalShow} onHide={() => setAddModalShow(false)} addConference={addConference} />
      {user.Designation === "coordinator" && (
        <div className="btns">
          <div className="download">
            <div className="template">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Download Template : &nbsp;
              </span>
              <button
                className="btn btn-primary"
                onClick={() =>
                  downloadExcel(conferenceData, "Conference-Template.xlsx")
                }
              >
                Download
              </button>
            </div>
            <div className="template">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                {" "}
                Download Data : &nbsp;{" "}
              </span>
              <button
                className="btn btn-primary"
                onClick={() => downloadExcel(jsontableData, "Conference.xlsx")}
              >
                Download
              </button>
            </div>
          </div>

          <div className="upload">
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              {" "}
              Files Supported (xls or xlsx) : &nbsp;
            </span>
            <input
              type="file"
              accept=".xls, .xlsx"
              id="upload"
              name="upload"
              onChange={UploadFile}
            />
            <input
              className="btn btn-primary"
              type="button"
              name="submit"
              value="Upload"
              onClick={uploadData}
            />
          </div>
        </div>
      )}

      {/* 
      <Form layout="vertical" className="m-3">
        <p>Files Supported: XLS or XLSX</p>
        <input
          type="file"
          accept=".xls, .xlsx"
          id="upload"
          name="upload"
          onChange={readUploadFile}
        />
        <br />
        <input
          type="button"
          name="submit"
          value="Submit"
          onClick={sendDataToServer}
        />
      </Form>

      <h2 style={{ padding: 10 }}>Title</h2>
      <p style={{ padding: 10 }}>
        {jsonData.Sheet1 &&
          jsonData.Sheet1?.map((data) => (
            <tr>{data["Title_of_Research_Paper"]}</tr>
          ))}
      </p> */}
      </div>
    </Layout>
  );
}

export default Conference;
