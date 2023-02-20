import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  user = {...user, currentPage:"Book"}
  
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
      <th
        scope="col"
        // onClick={() => alert(JSON.stringify(item, null, 4))}
        onClick={() => {
          setViewModalShow(true);
          setCurrentItem(item);
        }}
        style={{ cursor: "pointer" }}
      >
        VIEW
      </th>
      <th
        scope="col"
        onClick={() => {
          setEditModalShow(true);
          setCurrentItem(item);
        }}
        style={{ cursor: "pointer" }}
      >
        EDIT
      </th>
      {/* <th scope="col">EDIT</th> */}
    </tr>
  ));

  return (
    <Layout removeCookies={removeCookies}>
      {/* <h2 className="text-center">Upload File</h2> */}
      <>
        <h3 className="text-center">Book</h3>
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
        <div>
          <div className="mychange">
            Download Template :
            <button
              onClick={() => downloadExcel(conferenceData, "Conference.xlsx")}
            >
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
