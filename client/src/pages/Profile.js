import React,{ useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userAll } from "../redux/features/userSlice";

const Profile = ({ cookies, removeCookies }) => {
//  const [profile,setprofile] = useState([]);

  const { user } = useSelector((state) => state.user);
 
//   useEffect(() => {
//     setprofile(user);
//   })

  console.log(user);
  return (
    <Layout removeCookies={removeCookies}>
      <h4>Name : {user?.name}</h4>
      <h4>Email : {user?.email}</h4>
      <h4>Designation : {user?.Designation}</h4>
      <h4>Department : {user?.Department}</h4>
    </Layout>
  );
};

export default Profile;
