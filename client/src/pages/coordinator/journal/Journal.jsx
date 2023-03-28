import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Journal.css";
import { journalData } from "../../../components/Layout/data";
import Layout from "../../../components/Layout/Layout";
import ViewModal from "../../../components/viewModal/ViewModal";
import EditModal from "../../../components/EditModal/EditJournal";
import AddModal from "../../../components/AddModal";
import { getjournal, getauthorlist, getyearslist, getDOIList } from "../../../Action/coordinator/getdatajournal";
import { filterJournal, filterListItems } from "../../../Action/coordinator/filterjournal"
import { sendDataToServer, downloadExcel } from "../../../Action/coordinator/excelfilter"
import { readUploadFile } from "../../../Action/coordinator/excelUpload"
import UploadDownload  from "./UploadDownload";

function Journal({ cookies, removeCookies }) {
  const [jsonData, setJsonData] = useState([]);
  const [jsontableData, setJsontableData] = useState([]);
  const [viewModalShow, setViewModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const { user } = useSelector((state) => state.user);
  const [authorList, setAuthorList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [DOIList, setDOIList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");

  const [updatechange,setUpdatechange] = useState(false);

  const downloadData = jsontableData;
  downloadData.forEach((it, index) => {
    delete it._id;
    delete it.__v;
  });

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
      const res = await axios.post("http://localhost:5000/info/deletjournal", item);
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


  const authorListOptions = authorList.map(name => <option value={name}>{name}</option>)
  const yearListOptions = yearList.map(year => <option value={year}>{year}</option>)
  const listItems = jsontableData.map((item) => (
    <tr className="font-size-12">
      <th scope="row">{item.Sr_No}</th>
      <td>{item.Academic_Year}</td>
      <td>{item.Data_Submitting_Author_name}</td>
      <td>{item.Title_of_Research_Paper}</td>
      <td>{item.First_Author_name}</td>
      <td>{item.DOI}</td>
      <td>{item.Journal_title}</td>
      <td>{item.Journal_publisher}</td>
      <td>{item.ISSN_Print}</td>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setViewModalShow(true); setCurrentItem(item); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fa fa-eye" aria-hidden="true"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); setCurrentItem(item); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-edit"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => deleteJournal(item)}> <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-trash"></i> </th>
    </tr>
  ));

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

  const savechanges = async (newItem) => {
    const res = await axios.post(
      "http://localhost:5000/info/editjournal",
      newItem
    );
    setUpdatechange(true);
    // console.log(res.data);
  };
  
  const addJournal = async (newItem) => {
    try {
      const res = await axios.post("http://localhost:5000/info/addjournal", newItem);
      
      console.log(res.data);
      if(res.data.status === '1') {
        setUpdatechange(true);
        toast.success("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{
        toast.error("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log("succefully updated");
      console.log(err);
    }
  };

  const uploadData = () => {
    console.log("upload")
    sendDataToServer(jsonData, DOIList)
  }

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getDOIList(user);
      if (response.type === 'error') {
        console.log("error");
      }
      else {
        setDOIList(response.doidata);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {

      const response = await getjournal(user);

      if (response.type === 'error') {
        console.log("error");
      }
      else {
        console.log(response.journaldata);
        setJsontableData(response.journaldata)
      }

    }
    fetchdata();
  }, [updatechange]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getauthorlist();
      if (response.type === 'error') {

      } else {
        setAuthorList(response.authdata);
      }

      console.log(authorList);
    };
    fetchdata();
  }, [])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getyearslist();
      if (response.type === 'error') {

      } else {
        setYearList(response.yeardata);
      }

    };
    fetchdata();
  }, [])

  useEffect(() => {
    const fetchdata = async () => {
      const response = await filterJournal(user, "First_Author_name", selectedAuthor, "Academic_Year", selectedYear);
      if (response.type === 'error') {

      } else {
        setJsontableData(response.filterdata);
      }
    };
    fetchdata();
  }, [selectedAuthor, selectedYear])


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

        {/* <div className="journal-addbtn-parent main-container">
          <button className="btn btn-primary journal-addbtn  mt-1 mb-2" onClick={() => setAddModalShow(true)}> Add </button>
        </div> */}

        <div className="scrollit">
          <table id="journalTable" class="table table-hover table-bordered table-striped table-mymodify">
            <thead>
              <tr className="font-size-14">
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Sr_No')} scope="col">Sr No. <i className={`fas fa-angle${sortConfig.key === 'Sr_No' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Academic_Year')} scope="col">Academic Year <i className={`fas fa-angle${sortConfig.key === 'Academic_Year' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Data_Submitting_Author_name')} scope="col">Submitting Author <i className={`fas fa-angle${sortConfig.key === 'Data_Submitting_Author_name' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Title_of_Research_Paper')} scope="col">Title of Research Paper <i className={`fas fa-angle${sortConfig.key === 'Title_of_Research_Paper' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('First_Author_name')} scope="col">First Author <i className={`fas fa-angle${sortConfig.key === 'First_Author_name' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('DOI')} scope="col">DOI <i className={`fas fa-angle${sortConfig.key === 'DOI' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Journal_title')} scope="col">Journal Title <i className={`fas fa-angle${sortConfig.key === 'Journal_title' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('Journal_publisher')} scope="col">Journal Publisher <i className={`fas fa-angle${sortConfig.key === 'Journal_publisher' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort('ISSN_Print')} scope="col">ISSN (Print) <i className={`fas fa-angle${sortConfig.key === 'ISSN_Print' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                {/* <th scope="col">VIEW</th>
                <th scope="col">EDIT</th> */}
                <th scope="col">
                  <div className="journal-addbtn-parent main-container">
                    <button className="btn btn-primary journal-addbtn  mt-1 mb-2" onClick={() => setAddModalShow(true)}> Add </button>
                  </div>
                </th>
              </tr>
              <tr className="font-size-12">
                <th scope="col"></th>
                <th scope="col">
                  <div className="filter-group">
                    <div className="filter-group-select">
                      <select
                        className="form-select shadow-none font-size-12"
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value)}
                      >
                        <option value="">All</option>
                        {yearListOptions}
                      </select>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className="filter-group">
                    <div className="filter-group-select">
                      <select
                        className="form-select shadow-none font-size-12"
                        value={selectedAuthor}
                        onChange={e => setSelectedAuthor(e.target.value)}
                      >
                        <option value="">All</option>
                        {authorListOptions}
                      </select>
                    </div>
                  </div>
                </th>
                <th scope="col"></th>
                <th scope="col">
                  <div className="filter-group">
                    <div className="filter-group-select">
                      <select
                        className="form-select shadow-none font-size-12"
                        value={selectedAuthor}
                        onChange={e => setSelectedAuthor(e.target.value)}
                      >
                        <option value="">All</option>
                        {authorListOptions}
                        <option value="Jyoti V. Gautam">Jyoti V. Gautam</option>
                        <option value="Nikita P. Desai">Nikita P. Desai</option>
                        <option value="Ragini V. Oza">Ragini V. Oza</option>
                      </select>
                    </div>
                  </div>
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {/* <tbody>{listItems}</tbody> */}
            <tbody>
              {filterListItems(listItems, searchQuery).map((item, index) =>
                React.cloneElement(item, { key: index })
              )}
            </tbody>
          </table>
        </div>

        <ViewModal show={viewModalShow} onHide={() => setViewModalShow(false)} data={currentItem} />
        <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} savechanges={savechanges} data={currentItem} />
        <AddModal show={addModalShow} onHide={() => setAddModalShow(false)} addJournal={addJournal} />

        {/* {user.Designation === "coordinator" && (
          <div className="btns">
            <div className="download">
              <div className="template">
                <button className="btn btn-primary" onClick={() => downloadExcel(journalData, "Journal-Template.xlsx")} > Download Template </button>
              </div>
              <div className="template">
                <button className="btn btn-primary" onClick={() => downloadExcel(jsontableData, "Journal.xlsx")} > Download </button>
              </div>
            </div>

            <div className="upload">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                {" "}
                Files Supported (xls or xlsx) : &nbsp;
              </span>
              <input type="file" accept=".xls, .xlsx" id="upload" name="upload" onChange={UploadFile} />
              <input className="btn btn-primary" type="button" name="submit" value="Upload" onClick={uploadData} />
            </div>
          </div>
        )} */}

        <UploadDownload 
          designation={user.Designation} 
          journalData={journalData} 
          jsontableData={jsontableData}
          downloadExcel={downloadExcel}
          UploadFile={UploadFile}
          uploadData={uploadData}
        />
      </div>
    </Layout>
  );
}

export default Journal;
