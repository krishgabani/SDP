import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { userAll } from "../redux/features/userSlice";

const Home = ({ cookies, removeCookies }) => {
 
  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h1 className="text-center">Home page</h1>
      </>
    </Layout>
  );
};

export default Home;
