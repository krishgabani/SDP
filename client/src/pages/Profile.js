import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userAll } from "../redux/features/userSlice";
import axios from "axios"
import "../styles/Profile.css";

import EditProfileModal from "../components/EditProfileModal";

const Profile = ({ cookies, removeCookies }) => {
  //  const [profile,setprofile] = useState([]);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [currentItem, setCurrentItem] = useState();
  const { user } = useSelector((state) => state.user);

  const savechanges = async (newItem) => {
    console.log(newItem);
    try{
      const res = await axios.put("http://localhost:5000/api/user/updateprofile",newItem);
      console.log(res.data.profile);      
      userAll(res.data.profile);
    }catch(error){
      console.log(error);
      console.log("error occre in Update Profile");
    }
    // const res = await axios.post(
    //   "http://localhost:5000/info/editjournal",
    //   newItem
    // );
    // console.log(res.data);
  };

  //console.log(user);
  return (
    <Layout removeCookies={removeCookies}>
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
        <button  className="profile-edit-button" onClick={() => { setEditModalShow(true); }}>Edit</button>
      </div>
      <EditProfileModal show={editModalShow} onHide={() => setEditModalShow(false)} savechanges={savechanges} data={user}/>
    </Layout>
  );
};

export default Profile;
