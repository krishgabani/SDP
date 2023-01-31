import React from 'react'
import { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Journal() {

  const [jsonData, setJsonData] = useState([]);

    const excelFileToJSON =(file) => {
      try{
          
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e) => {
                const data = e.target.result;
                //console.log(data);
                const workbook = xlsx.read(data, { type: "binary" });
                var result = {};
                
                //console.log(workbook);
                workbook.SheetNames.forEach(function(sheetName) {
                  
                  var roa = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                  console.log(roa);
                  if(roa.length >0 ) {
                    //console.log(roa);
                    result[sheetName] = roa;
                  }
              });
              console.log(result);
            setJsonData(result);
            
            console.log("hellow");
          };

      }catch(error) {
        console.log(error);
      }
    }
    const readUploadFile = (e) => {
        e.preventDefault();
          var files = document.getElementById('upload').files;
          if(files.length==0){
            alert("Please choose any file...");
            return;
          }
          var filename = files[0].name;
          var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
          if (extension == '.XLS' || extension == '.XLSX') {
            console.log(files[0]);
              excelFileToJSON(files[0]);

          }else{
              alert("Please select a valid excel file.");
          }
        
      };

  // const readUploadFile = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = e.target.result;
  //       console.log(data);
  //       const workbook = xlsx.read(data, { type: "array" });
  //       console.log(workbook);
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const json = xlsx.utils.sheet_to_json(worksheet);


  //       setJsonData(json);
  //       console.log(jsonData);
  //       console.log("hellow");
  //     };
  //     reader.readAsArrayBuffer(e.target.files[0]);
  //   }
  // };

  const sendDataToServer = () => {
     console.log(jsonData);
    axios.post("http://localhost:5000/sendjournal", jsonData).then((res) => {
      console.log("Server response for /senddata is " + res.data);
      
      toast.success('Journal is uploaded successfuly',{
        position: toast.POSITION.TOP_RIGHT
      });

      return (
        <>
          <h1>Hellow world</h1>
        </>
      )
    })
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
  );
};

export default Journal
