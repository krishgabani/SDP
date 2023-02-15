import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { userAll } from "../redux/features/userSlice";

const Home = ({ cookies, removeCookies }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hiithere");

    const { token } = cookies;

    const getUserData = async () => {
      try {
        //dispatch(showLoading());
        console.log("jeioire");
        const res = await axios.get(
          "http://localhost:5000/api/user/getUserData",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        console.log("jeioire");
        dispatch(hideLoading());

        if (res.data.success) {
          console.log("iohjere");
          console.log(res.data);
          dispatch(userAll(res.data));
        }
      } catch (error) {
        console.log(error);
        toast.error("Some Error is Occure", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    // f (!userAll) {i
      getUserData();
    // }
  }, []);
  return (
    <Layout removeCookies={removeCookies}>
      <>
        <h1 className="text-center">Home page</h1>
      </>
    </Layout>
  );
};

export default Home;
