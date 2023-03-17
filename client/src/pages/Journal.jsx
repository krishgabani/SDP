import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Journal.css";
import { journalData } from "../components/Layout/data";
import Layout from "../components/Layout/Layout";
import ViewModal from "../components/ViewModal";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";

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
  const [authorList,setAuthorList] = useState([]);
  const [yearList,setYearList] = useState([]);
  const [DOIList,setDOIList] = useState([]);
  const [sortConfig, setSortConfig] = useState({key: null, direction: null});
  const [searchQuery, setSearchQuery] = useState("");

  const downloadData = jsontableData;
  downloadData.forEach((it, index) => {
    delete it._id;
    delete it.__v;
  });

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
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setViewModalShow(true); setCurrentItem(item); }} > <i style={{fontSize: "13px", color: "#0077b6"}} class="fa fa-eye" aria-hidden="true"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); setCurrentItem(item); }} > <i style={{fontSize: "13px", color: "#0077b6"}} class="fas fa-edit"></i> </th>
      <th scope="col" style={{ cursor: "pointer", padding: "10px" }} > <i style={{fontSize: "13px", color: "#0077b6"}} class="fas fa-trash"></i> </th>
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
    setSortConfig({key, direction});
    console.log(jsontableData);
  };
  const excelFileToJSON = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "binary" });
        var result = {};

        workbook.SheetNames.forEach(function (sheetName) {
          var roa = xlsx.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        setJsonData(result);
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
      // console.log(files[0]);
      excelFileToJSON(files[0]);
    } else {
      alert("Please select a valid excel file.");
    }
  };
  const messageOnDuplicate = (doi,title) => {
    toast.info(`Research pepar having doi ${doi} is already in database.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const deleteDuplicate = () => {
    for (let i = jsonData.Sheet1.length - 1; i >= 0; i--) {
      if (DOIList.includes(jsonData.Sheet1[i].DOI)) {
        messageOnDuplicate(jsonData.Sheet1[i].DOI,jsonData.Sheet1[i].Title_of_Research_Paper);
        jsonData.Sheet1.splice(i, 1);
      }
    }
  };
  const sendDataToServer = () => {
    // console.log(jsonData.Sheet1);
    deleteDuplicate();
    if(jsonData.Sheet1.length === 0) return;
    axios
      .post("http://localhost:5000/info/sendjournal", jsonData)
      .then((res) => {
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
  const savechanges = async (newItem) => {
    const res = await axios.post(
      "http://localhost:5000/info/editjournal",
      newItem
    );
    // console.log(res.data);
  };
  const addJournal = async (newItem) => {
    try { 
      const res = await axios.post("http://localhost:5000/info/addjournal",newItem);
      console.log(res.data);
    } catch(err){
      console.log("succefully updated");
      console.log(err);
    }
  };

  useEffect(() => {
    const getDOIList = async () => {
      const res = await axios.post(
        "http://localhost:5000/info/getdoilist",
        user
      );
      let doilist = res.data.data.map(item => item.doi)
      setDOIList(doilist);
    };
    getDOIList();
  }, []);

  useEffect(() => {
    const getdatajournal = async () => {
      const res = await axios.post(
        "http://localhost:5000/info/getjournal",
        user
      );
      // console.log(res.data.data);
      setJsontableData(res.data.data);
    };
    getdatajournal();
  }, []);

  useEffect(()=>{
    const getauthorlist = async () => {
      const res = await axios.post(
        "http://localhost:5000/info/getfacultynames"
      );
      setAuthorList(res.data.data);
      console.log(authorList);
    };
    getauthorlist();
  },[])

  useEffect(()=>{
    const getyearslist = async () => {
      const res = await axios.post(
        "http://localhost:5000/info/getyearslist"
      );
      setYearList(res.data.data);
      // console.log(yearList);
    };
    getyearslist();
  },[])

  useEffect(()=>{
    const filterJournal = async (authorKey,authorValue,yearKey,yearValue) => {
      let res;
      if(authorValue == "" && yearValue == "") {
        res = await axios.post(
          `http://localhost:5000/info/getjournal`,
          user
        );
      } else {
          let filterQuery = "";
          if(authorValue != ""){
            filterQuery += `${authorKey}=${authorValue}`;
          }
          if(yearValue != "") {
            if(filterQuery != "") filterQuery += "&";
            filterQuery += `${yearKey}=${yearValue}`;
          }
          res = await axios.post(
            `http://localhost:5000/info/getjournal?${filterQuery}`,
            user
          );
      }
      setJsontableData(res.data.data);
    };
    filterJournal("First_Author_name",selectedAuthor,"Academic_Year",selectedYear);
  },[selectedAuthor,selectedYear])

  
  if (!user) return <></>;
  return (
    <Layout removeCookies={removeCookies}>
      <div className="main-container">
        <div className="input-group mb-4 border rounded-pill p-1">
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

        <div className="journal-addbtn-parent">
          <button className="btn btn-primary journal-addbtn" onClick={() => setAddModalShow(true)}> ADD </button>
        </div>

        <div className="scrollit">
          <table id="journalTable" class="table table-hover table-bordered table-striped table-mymodify">
            <thead>
              <tr className="font-size-14">
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Sr_No')} scope="col">Sr No. <i className={`fas fa-angle${sortConfig.key === 'Sr_No' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Academic_Year')} scope="col">Academic Year <i className={`fas fa-angle${sortConfig.key === 'Academic_Year' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Data_Submitting_Author_name')} scope="col">Submitting Author <i className={`fas fa-angle${sortConfig.key === 'Data_Submitting_Author_name' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Title_of_Research_Paper')} scope="col">Title of Research Paper <i className={`fas fa-angle${sortConfig.key === 'Title_of_Research_Paper' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('First_Author_name')} scope="col">First Author <i className={`fas fa-angle${sortConfig.key === 'First_Author_name' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('DOI')} scope="col">DOI <i className={`fas fa-angle${sortConfig.key === 'DOI' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Journal_title')} scope="col">Journal Title <i className={`fas fa-angle${sortConfig.key === 'Journal_title' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('Journal_publisher')} scope="col">Journal Publisher <i className={`fas fa-angle${sortConfig.key === 'Journal_publisher' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                <th style={{cursor: "pointer"}} onClick={() => handleSort('ISSN_Print')} scope="col">ISSN (Print) <i className={`fas fa-angle${sortConfig.key === 'ISSN_Print' && sortConfig.direction === 'ascending' ? '-up' : '-down'}`} ></i></th>
                {/* <th scope="col">VIEW</th>
                <th scope="col">EDIT</th> */}
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
              {listItems
                .filter((item) => {
                  const srNo =
                    item.props.children[0].props.children?.toLowerCase();
                  const academicYear =
                    item.props.children[1].props.children?.toLowerCase();
                  const submitingAuthor =
                    item.props.children[2].props.children?.toLowerCase();
                  const title =
                    item.props.children[3].props.children?.toLowerCase();
                  const firstAuthor =
                    item.props.children[4].props.children?.toLowerCase();
                  const doi =
                    item.props.children[5].props.children?.toLowerCase();
                  const journaltitle =
                    item.props.children[6].props.children?.toLowerCase();
                  const journalpublisher =
                    item.props.children[7].props.children?.toLowerCase();
                  const issnprint =
                    item.props.children[8].props.children?.toLowerCase();
                  
                  return (
                    (srNo && srNo.includes(searchQuery.toLowerCase())) ||
                    (academicYear && academicYear.includes(searchQuery.toLowerCase())) ||
                    (firstAuthor && firstAuthor.includes(searchQuery.toLowerCase())) ||
                    (title && title.includes(searchQuery.toLowerCase())) ||
                    (submitingAuthor && submitingAuthor.includes(searchQuery.toLowerCase())) ||
                    (journalpublisher && journalpublisher.includes(searchQuery.toLowerCase())) ||
                    (journaltitle && journaltitle.includes(searchQuery.toLowerCase())) ||         
                    (issnprint && issnprint.includes(searchQuery.toLowerCase())) ||
                    (doi && doi.includes(searchQuery?.toLowerCase()))
                  );
                })
                .map((item, index) => React.cloneElement(item, { key: index }))}
            </tbody>
          </table>
        </div>

        <ViewModal show={viewModalShow} onHide={() => setViewModalShow(false)} data={currentItem} />
        <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} savechanges = {savechanges} data={currentItem} />
        <AddModal show={addModalShow} onHide={() => setAddModalShow(false)} addJournal = {addJournal} />

        {user.Designation === "coordinator" && (
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
              <input type="file" accept=".xls, .xlsx" id="upload" name="upload" onChange={readUploadFile} />
              <input className="btn btn-primary" type="button" name="submit" value="Upload" onClick={sendDataToServer} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Journal;
