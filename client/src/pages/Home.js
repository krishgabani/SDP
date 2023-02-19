import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import "../styles/Home.css";

const Home = ({ cookies, removeCookies }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h1 className="text-center">Home page</h1>
      </>
    </Layout>
  );
};

export default Home;
