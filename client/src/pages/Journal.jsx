import React from 'react'
import { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import { Col ,Row,Form,Input,TimePicker} from 'antd';

function Journal({cookies ,removeCookies}) {

  const [jsonData, setJsonData] = useState([]);
  
    console.log("heeloe");
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
              console.log(result.Journal);
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
  const sendDataToServer = () => {
     console.log(jsonData);
     console.log(jsonData.Journal)
    axios.post("http://localhost:5000/sendjournal", jsonData).then((res) => {
      console.log("Server response for /senddata is " + res.data);
      
      toast.success('Journal is uploaded successfuly',{
        position: toast.POSITION.TOP_RIGHT
      });
      
    })
  };

  return (
    <Layout>
      <h1 className='text-center'>Upload File</h1>

      <Form layout='vertical' className='m-3'>
      {/* <Row>
        <h1>Helloe world</h1>
      </Row> */}
       
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
      </Form>

      <h2>Title</h2>
            <p>
             {
                jsonData.Journal && 
                jsonData.Journal?.map((data) => (
                    <tr>{data["Title of Research Paper"]}</tr>
                ))
              }
            </p>
    </Layout>
  );
};

export default Journal
