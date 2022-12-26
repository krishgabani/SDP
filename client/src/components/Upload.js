import { useState } from "react";
import * as xlsx from "xlsx";
import axios from "axios";

const Upload = () => {
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
        // console.log(jsonData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const sendDataToServer = () => {
    // console.log(jsonData);
    axios.post("http://localhost:5000/senddata", jsonData).then((res) => {
      console.log("Server response for /senddata is " + res.data);
    });
  };
  return (
    <div>
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
    </div>
  );
};

export default Upload;
{
  /* <div>
      <form>
        <label htmlFor="upload">Upload File : </label>
        <input
          type="file"
          name="upload"
          id="upload"
          accept=".xls, .xlsx"
          onChange={readUploadFile}
        />
        <input
          type="button"
          name="submit"
          value="Submit"
          onClick={sendDataToServer}
        />
      </form>
    </div> */
}
