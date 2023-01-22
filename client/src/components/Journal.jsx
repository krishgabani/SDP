import React from 'react'
import { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Journal() {

  const [jsonData, setJsonData] = useState([]);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setJsonData(json);
        // console.log(jsonData);x
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const sendDataToServer = () => {
    // console.log(jsonData);
    axios.post("http://localhost:5000/sendjournal", jsonData).then((res) => {
      console.log("Server response for /senddata is " + res.data);
      
      toast.success('Journal is uploaded successfuly',{
        position: toast.POSITION.TOP_RIGHT
      });
    }).catch((error)=> {
      toast.error('Journal is not upload in DB')
    });
  };

  return (
    <>
      <form>
        <h3>Upload File</h3>
        <p>Files Supported: XLS or XLSX</p>
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
      </form>
      
    </>
  )
}

export default Journal
