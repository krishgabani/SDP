import { toast } from "react-toastify";
import axios from 'axios'
import * as xlsx from "xlsx";

const messageOnDuplicate = (doi, title) => {
    toast.info(`Research pepar having doi ${doi} is already in database.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const deleteDuplicate = (jsonData,DOIList) => {
    console.log("hellow");
    for (let i = jsonData.Sheet1.length - 1; i >= 0; i--) {
      if (DOIList.includes(jsonData.Sheet1[i].DOI)) {
        messageOnDuplicate(jsonData.Sheet1[i].DOI, jsonData.Sheet1[i].Title_of_Research_Paper);
        jsonData.Sheet1.splice(i, 1);
      }
    }
  };
  const sendDataToServer = async (jsonData,DOIList) => {

    try{
      console.log("sendServer");
        deleteDuplicate(jsonData,DOIList);
        if (jsonData.Sheet1.length === 0) return;
        await axios.post("http://localhost:5000/info/sendjournal", jsonData).then((res) => {
            console.log("Server response for /sendjournal is " + res.data);
            console.log(res.data);
            toast.success("Journal is uploaded successfuly", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
    }catch(error) {
        return {
            type: "error",
            error: error[0]
        }
    }
    // console.log(jsonData.Sheet1);

  };

  const sendDataconference = async (jsonData,DOIList) => {

    try{
        console.log(jsonData)
        deleteDuplicate(jsonData,DOIList);
        console.log(jsonData.Sheet1);
        if (jsonData.Sheet1.length === 0) return;
        console.log("data goes")
        await axios.post("http://localhost:5000/info/sendconference", jsonData).then((res) => {
            console.log("Server response for /sendjournal is " + res.data);
    
            toast.success("Journal is uploaded successfuly", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
    }catch(error) {
        return {
            type: "error",
            error: error[0]
        }
    }
    // console.log(jsonData.Sheet1);

  };

  const downloadExcel = (data, filename) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, filename);
  };

  export {sendDataToServer,downloadExcel,sendDataconference}