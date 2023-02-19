import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";
import { Col, Row, Form, Input, TimePicker } from "antd";
import { journalData } from "../components/Layout/data";
import "../styles/Journal.css";
import { useDispatch, useSelector } from "react-redux";

function Journal({ cookies, removeCookies }) {
  const [jsonData, setJsonData] = useState([]);

  //console.log("heeloe");
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
          //console.log(roa);
          if (roa.length > 0) {
            //console.log(roa);
            result[sheetName] = roa;
          }
        });
        // console.log(result);
        //console.log(result.Sheet1);
        setJsonData(result);

        //console.log("hellow");
      };
    } catch (error) {
      console.log(error);
    }
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    var files = document.getElementById("upload").files;
    if (files.length === 0) {
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension === ".XLS" || extension === ".XLSX") {
      console.log(files[0]);
      excelFileToJSON(files[0]);
    } else {
      alert("Please select a valid excel file.");
    }
  };
  const sendDataToServer = () => {
    console.log(jsonData.Sheet1);
    axios.post("http://localhost:5000/info/sendjournal", jsonData).then((res) => {
      console.log("Server response for /sendjournal is " + res.data);

      toast.success("Journal is uploaded successfuly", {
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
  const [jsontableData, setJsontableData] = useState([]);
  const { user } = useSelector((state) => state.user);
  console.log("hoiehroie");
  console.log(user);
  useEffect(() => {
    const getdatajournal = async () => {
      const res = await axios.post("http://localhost:5000/info/getjournal", user);
      console.log(res.data.data);
      setJsontableData(res.data.data);
    };
    getdatajournal();
  }, []);

  // if (user["Designation"] == "coordinator") {
  //   console.log("coordinator here");
  // } else if (user["Designation"] == "faculty") {
  //   console.log("faculty here");
  // }

  console.log("jsonData");
  console.log(jsontableData);

  const listItems = jsontableData.map((item) => (
    <tr>
      <th scope="row">{item.Sr_No}</th>
      <td>{item.Academic_Year}</td>
      <td>{item.First_Author_name}</td>
      <td>{item.Title_of_Research_Paper}</td>
      <th
        scope="col"
        onClick={() => alert(JSON.stringify(item, null, 4))}
        style={{ cursor: "pointer" }}
      >
        VIEW
      </th>
      <th scope="col" style={{ cursor: "pointer" }}>
        EDIT
      </th>
      {/* <th scope="col">EDIT</th> */}
    </tr>
  ));
  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h3 className="text-center">Journal</h3>
        <div className="scrollit">
          <table class="table table-hover table-bordered table-mymodify">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Academic Year</th>
                <th scope="col">First Author</th>
                <th scope="col">Title of Research Paper</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
      </>

      <div className="mychange">
        Download Template :
        <button onClick={() => downloadExcel(journalData, "Journal.xlsx")}>
          Download
        </button>
      </div>

      <div className="upload">
        Files Supported: XLS or XLSX :
        <input
          type="file"
          accept=".xls, .xlsx"
          id="upload"
          name="upload"
          onChange={readUploadFile}
        />
        <input
          type="button"
          name="submit"
          value="Submit"
          onClick={sendDataToServer}
        />
      </div>
    </Layout>
  );
}

export default Journal;
