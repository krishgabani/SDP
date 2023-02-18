import React from "react";
import axios from "axios";
import { useState } from "react";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";
import { Col, Row, Form, Input, TimePicker } from "antd";
import { journalData } from "../components/Layout/data";
import "../styles/Journal.css"

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
    axios.post("http://localhost:5000/sendjournal", jsonData).then((res) => {
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

  return (
    <Layout removeCookies={removeCookies}>
    <div>Journal</div>
    
      <div className="mychange">    
        Download Template :
        <button onClick={() => downloadExcel(journalData, "Journal.xlsx")}>
          Download
        </button>
      </div>

      {/* <h2 className="text-center">Upload File</h2> */}

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
