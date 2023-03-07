import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import "../styles/Home.css";
import axios from "axios";
import CoordinatorList from "../components/CoordinatorList";
import {Row,message} from 'antd'

const Home = ({ cookies, removeCookies }) => {
  const { user } = useSelector((state) => state.user);
  const [coordinatorList,setcoordinatorList] = useState([]);
  console.log(user);
 
  useEffect(()=>{
    if(user?.Designation === 'Admin') {
      const getAllCoordinates = async () => {
        const tem = await axios.get("http://localhost:5000/api/admin/getAllCooridnates");
        console.log(tem.data);
        setcoordinatorList(tem.data.data);
        console.log(coordinatorList);
      }
      
      getAllCoordinates();
    }
  },[])

  return (
    <Layout removeCookies={removeCookies}>
      <>
      <h1 className="text-center">Home page</h1>
      <Row>
          {coordinatorList && coordinatorList.map((coordinator) => <CoordinatorList coordinator={coordinator} />)}
      </Row>
      
      </>
    </Layout>
  );

};

export default Home;
