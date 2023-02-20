import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userAll } from "../redux/features/userSlice";
import "../styles/Profile.css";

const Profile = ({ cookies, removeCookies }) => {
  //  const [profile,setprofile] = useState([]);

  const { user } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     setprofile(user);
  //   })

  console.log(user);
  return (
    <Layout removeCookies={removeCookies}>
      {/* <h3 className="text-center">Profile</h3>
    <div className="text-center mycard">
      <h4>Name : {user?.name}</h4>
      <h4>Email : {user?.email}</h4>
      <h4>Designation : {user?.Designation}</h4>
      <h4>Department : {user?.Department}</h4>
      <button>Edit</button>
    </div> */}
      <h3 class="text-center">Profile</h3>
      <div class="text-center mycard">
        <div class="row">
          <div class="col-4">
            <h4 class="label">Name:</h4>
          </div>
          <div class="col-8">
            <h4 class="value">{user?.name}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <h4 class="label">Email:</h4>
          </div>
          <div class="col-8">
            <h4 class="value">{user?.email}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <h4 class="label">Designation:</h4>
          </div>
          <div class="col-8">
            <h4 class="value">{user?.Designation}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <h4 class="label">Department:</h4>
          </div>
          <div class="col-8">
            <h4 class="value">{user?.Department}</h4>
          </div>
        </div>
        <button>Edit</button>
      </div>
    </Layout>
  );
};

export default Profile;
