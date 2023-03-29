import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import "../styles/Home.css";
import axios from "axios";
import CoordinatorList from "../components/CoordinatorList";
import { Row, message } from "antd";
import { toast } from "react-toastify";
const Departments = ({ cookies, removeCookies }) => {
  const { user } = useSelector((state) => state.user);

  const [coordinatorList, setcoordinatorList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [updateList,setupdateList] = useState(false);

  const [depart, setdepart] = useState('');
  console.log(coordinatorList);

  const setdepartemnt = async (depart) => {
    try {
      const tem = await axios.post("http://localhost:5000/api/user/editdepartment", { department: depart });
      console.log(tem.data?.newdepart);
      if (tem.data.success == 0) {
        toast.error("" + tem.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const temp = await axios.get("http://localhost:5000/api/admin/getAllCooridnates");
      console.log(temp.data);
      setcoordinatorList(temp.data.data);

      console.log(depart);
      // return temp.data?.newdepart;
    } catch (error) {
      console.log(error);
      console.log("error while posting or getting the data");
    }

  }

  useEffect(() => {
    try {
      if (user?.Designation === "Admin") {
        const getAllCoordinates = async () => {
          const tem = await axios.get(
            "http://localhost:5000/api/admin/getAllCooridnates"
          );
          console.log(tem.data);
          setcoordinatorList(tem.data.data);
          console.log(coordinatorList);
        };
        // if(!coordinatorList) {
        getAllCoordinates();
        // }  

      }
    } catch (error) {
      console.log(error);
      console.log("In User Admin is something wrong");
    }
  }, []);

  useEffect(() => {
    try {
      const getAllDepartment = async () => {
        const tem = await axios.post(
          "http://localhost:5000/api/user/getdepartment"
        );
        //console.log(tem.data);
        let deplist = tem.data.data;
        let mylist = deplist.map((dep) => dep.department);
        setDepartmentList(mylist);
      };
      getAllDepartment();
    } catch (error) {
      console.log(error);
      console.log("Error Occur in Department");
    }
  }, []);

  useEffect(() => {
    //console.log(coordinatorList)
  }, [coordinatorList])

  const editdepartment = async (e) => {
    e.preventDefault();
    try {
      //window. location. reload()
      console.log(depart);
      let mydata = await setdepartemnt(depart)
      setdepart('');
      console.log(depart);
      console.log(departmentList)
    } catch (error) {
      console.log(error);
      console.log("Error in editdepartment ")
    }

  };
  if (user?.Designation === "Admin") {
    console.log(coordinatorList);
    return (
      <Layout removeCookies={removeCookies}>
        <>
          <div className="container">
            <div>
              <h2 className="text-center">Departments & Coordinators</h2>
              <b>Department Name: </b>
              <input
                className="search-departement"
                type="text"
                name="department"
                value={depart}
                onChange={e => setdepart(e.target.value)}
                required
              />
              <input className="department-head" type="submit" onClick={editdepartment} value="ADD" />
            </div>

            <Row>
              {coordinatorList && (
                <CoordinatorList coordinatorList={coordinatorList} savechange={setcoordinatorList} departmentList={departmentList}
                  deptchange={setDepartmentList} updatechange={setupdateList}
                />
              )}
            </Row>
          </div>

        </>
      </Layout>
    );
  }
};

export default Departments;
