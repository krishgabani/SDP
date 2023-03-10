import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import "../styles/Home.css";
import axios from "axios";
import CoordinatorList from "../components/CoordinatorList";
import { Row, message } from "antd";

const Home = ({ cookies, removeCookies }) => {
  const { user } = useSelector((state) => state.user);
  const [coordinatorList, setcoordinatorList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [depart, setdepart] = useState({
    department: "",
  });
  console.log(user);

  const sethandler = (e) => {
    const { name, value } = e.target;
    setdepart({
      ...depart,
      [name]: value,
    });
    console.log(depart);
  };

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

        getAllCoordinates();
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

  const editdepartment = async () => {
    try{
      window. location. reload()
      const res = await axios.post(
        "http://localhost:5000/api/user/editdepartment",
        depart
      );
      console.log(res.data);      
    }catch(error) {
      console.log(error);
      console.log("Error in editdepartment ")
    }

  };
  if (user?.Designation === "Admin") {
    return (
      <Layout removeCookies={removeCookies}>
        <>
        <div className="container coordinator-container">
        <h2 className="text-center">All Coordinators</h2>
          Add Department{" "}
          <input
            type="text"
            name="department"
            value={depart.department}
            onChange={sethandler}
            required
          />
          <input type="submit" onClick={editdepartment} />
          <Row>
            {coordinatorList &&
              coordinatorList.map((coordinator) => (
                <CoordinatorList coordinator={coordinator} />
              ))}
          </Row>
        </div>

        </>
      </Layout>
    );
  }else{
    return(
      <Layout removeCookies={removeCookies}>
        <h1>Home</h1>
      </Layout>
    );
  }

};

export default Home;
