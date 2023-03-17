import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CoordinatorList.css";
import axios from "axios";

const CoordinatorList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deletecoordinator = async () => {
    // console.log(props.coordinator);
    try {
      console.log(props.mystate);
      let respdata = props.mystate;
      //console.log(respdata)
      const newData = respdata.filter(
        (item) => item.Department !== props.coordinator?.Department
      );
      props.savechage(newData);
      const tem = await axios.put(
        "http://localhost:5000/api/admin/deleteCoordinator",
        { deprt: props.coordinator?._id }
      );
      //console.log(tem.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletedepartment = async () => {
    try {
      // console.log(props.mystate);

      // Need to update the Parent componets state.
      let respdata = props.mystate;
      const newData = respdata.filter(
        (item) => item.department !== props.coordinator?.department
      );
      //console.log(newData);

      const tem = await axios.put(
        "http://localhost:5000/api/admin/deletedepartment",
        { deprt: props.coordinator?._id }
      );
      //window.location.reload();
      props.savechage(newData);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  if (props.coordinator?.email) {
    return (
      <>
        <div className="card m-2 card-style card-size">
          <div className="card-header">
            <b>{props.coordinator?.Department}</b>
          </div>
          <div className="card-body">
            <p>
              <b>Name :</b> {props.coordinator?.name}
            </p>
            <p>
              <b>Email :</b> {props.coordinator?.email}
            </p>
            {/* <button className='m-2'>View</button> */}
            <button
              className="btn btn-primary m-2"
              onClick={() => navigate(`/allfaculty/${props.coordinator?._id}`)}
            >
              View All Faculty
            </button>
            <button className="btn btn-primary m-2" onClick={deletecoordinator}>
              Delete
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="card m-2">
          <div className="card-header">
            <b>{props.coordinator?.department}</b>
          </div>
          <button className="btn btn-primary m-2" onClick={deletedepartment}>
            Delete
          </button>
        </div>
      </>
    );
  }
};
export default CoordinatorList;
