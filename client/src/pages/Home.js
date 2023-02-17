import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch,useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { userAll } from "../redux/features/userSlice";

const Home = ({ cookies, removeCookies }) => {
  const [jsonData, setJsonData] = useState([]);
  const {user} = useSelector((state) => state.user);
  console.log("hoiehroie");
  console.log(user);
  useEffect(() => {
    const getdatajournal = async () => {
      const res = await axios.post('http://localhost:5000/getjournal',user);
      console.log(res.data.data);
    }
    getdatajournal();
  })
  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h1 className="text-center">Home page</h1>
      </>
    </Layout>
  );
};

export default Home;
