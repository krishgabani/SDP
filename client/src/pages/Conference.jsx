import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Journal.css";
import { conferenceData } from "../components/Layout/data";
import Layout from "../components/Layout/Layout";
import ViewModal from "../components/ViewModal";
import EditModalConference from "../components/EditModalConference";

function Conference({ cookies, removeCookies }) {
  const [jsonData, setJsonData] = useState([]);
  const [jsontableData, setJsontableData] = useState([]);
  const [viewModalShow, setViewModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState([]);
  let { user } = useSelector((state) => state.user);
  user = {...user, currentPage:"Conference"}
  const downloadData = jsontableData;
  downloadData.forEach((it,index) => {
    delete it._id;
    delete it.__v;
  })

  const excelFileToJSON = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        //console.log(data);
        const workbook = xlsx.read(data, { type: "binary" });
        var result = {};

        //console.log(workbook);
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = xlsx.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          // console.log(roa);
          if (roa.length > 0) {
            //console.log(roa);
            result[sheetName] = roa;
          }
        });
        // console.log(result);
        // console.log(result.Sheet1);
        setJsonData(result);

        // console.log("hellow");
      };
    } catch (error) {
      // console.log(error);
    }
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    var files = document.getElementById("upload").files;
    if (files.length == 0) {
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == ".XLS" || extension == ".XLSX") {
      // console.log(files[0]);
      excelFileToJSON(files[0]);
    } else {
      alert("Please select a valid excel file.");
    }
  };
  const sendDataToServer = () => {
    // console.log(jsonData.Sheet1);
    axios
      .post("http://localhost:5000/info/sendconference", jsonData)
      .then((res) => {
        console.log("Server response for /sendconference is " + res.data);

        toast.success("Conference is uploaded successfuly", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const downloadExcel = (data, filename) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, filename);
  };

  useEffect(() => {
    const getdataconference = async () => {
      const res = await axios.post(
        "http://localhost:5000/info/getconference",
        user
      );
      // console.log(res.data.data);
      setJsontableData(res.data.data);
    };
    getdataconference();
  }, []);

  const savechanges = async (newItem) => {
    const res = await axios.post(
      "http://localhost:5000/info/editconference",
      newItem
    );
    // console.log(res.data);
  };

  // console.log(jsontableData);

  const listItems = jsontableData.map((item) => (
    <tr>
      <th scope="row">{item.Sr_No}</th>
      <td>{item.Academic_Year}</td>
      <td>{item.First_Author_name}</td>
      <td>{item.Title_of_Research_Paper}</td>
      <td>{item.Data_Submitting_Author_name}</td>
      <td>{item.Data_Submitting_Author_department}</td>
      <td>{item.Publication_Level}</td>
      <td>{item.First_Author_organization}</td>
      <td>{item.Names_of_Other_Author_From_DDU}</td>
      <td>{item.Names_of_Other_Author_From_other_Organization}</td>
      <td>{item.Publication_Type}</td>
      <td>{item.Publication_Level}</td>
      <td>{item.Title_of_the_conference}</td>
      <td>{item.Start_Date_DD_MM_YYYY}</td>
      <td>{item.End_Date_DD_MM_YYYY}</td>
      <td>{item.Conference_Name}</td>
      <td>{item.Conference_Organizer}</td>
      <td>{item.Conference_City}</td>
      <td>{item.Conference_State}</td>
      <td>{item.Conference_Country}</td>
      <td>{item.Name_of_the_Publisher}</td>
      <td>{item.Publication_Date_DD_MM_YYYY}</td>
      <td>{item.Pages_xx_yy}</td>
      <td>{item.DOI}</td>
      <td>{item.ISBN_or_ISSN}</td>
      <td>{item.Affiliating_Institute_at_the_time_of_publication}</td>
      <th
        className="myb fixed-right-view"
        scope="col"
        onClick={() => {
          setViewModalShow(true);
          setCurrentItem(item);
        }}
        style={{ cursor: "pointer" }}
      >
        VIEW
      </th>
      <th
        className="myb fixed-right-edit"
        scope="col"
        onClick={() => {
          setEditModalShow(true);
          setCurrentItem(item);
        }}
        style={{ cursor: "pointer" }}
      >
        EDIT
      </th>
    </tr>
  ));

  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h3 className="text-center">Conference</h3>
        <div class="scrollit">
          <table class="table table-hover table-bordered table-mymodify-confo">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Academic Year</th>
                <th scope="col">First Author</th>
                <th scope="col">Title of Research Paper</th>
                <th scope="col">Data Submitting Author name</th>
                <th scope="col">Data Submitting Author department</th>
                <th scope="col">Publication Level</th>
                <th scope="col">First Author organization</th>
                <th scope="col">Names of Other Author From DDU</th>
                <th scope="col">Names of Other Author From other Organization</th>
                <th scope="col">Publication Type</th>
                <th scope="col">Publication Level</th>
                <th scope="col">Title of the conference</th>
                <th scope="col">Start Date (DD-MM-YYYY)</th>
                <th scope="col">End Date (DD-MM-YYYY)</th>
                <th scope="col">Conference Name</th>
                <th scope="col">Conference Organizer</th>
                <th scope="col">Conference City</th>
                <th scope="col">Conference State</th>
                <th scope="col">Conference Country</th>
                <th scope="col">Name of the Publisher</th>
                <th scope="col">Publication Date (DD-MM-YYYY)</th>
                <th scope="col">Pages xx yy</th>
                <th scope="col">DOI</th>
                <th scope="col">ISBN or ISSN</th>
                <th scope="col">Affiliating Institute </th>
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
      </>
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
            onChange={readUploadFile}
          />
          <input
            className="btn btn-primary"
            type="button"
            name="submit"
            value="Upload"
            onClick={sendDataToServer}
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
    </Layout>
  );
}

export default Conference;
