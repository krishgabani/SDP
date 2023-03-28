import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CoordinatorList.css";
import axios from "axios";
import { toast } from "react-toastify";

const CoordinatorList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deletecoordinator = async () => {
    // console.log(props.coordinator);
    try {
      // console.log(props.mystate);
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
      
      let respdata = props.mystate;
      const newData = respdata.filter(
        (item) => item.department !== props.coordinator?.department
      );

      // Create and style the alert box
      const alertBox = document.createElement('div');
      alertBox.classList.add('alert-box');
      alertBox.innerHTML = `
        <span class="close-btn">&times;</span>
        <p>Are you sure you want to delete?</p>
        <button class="confirm-btn">Confirm</button>
      `;

    // Append the alert box to the document body
    document.body.appendChild(alertBox);
  
    // Add event listener to the confirm button
    const confirmBtn = alertBox.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', async () => {
      const tem = await axios.put("http://localhost:5000/api/admin/deletedepartment",{ deprt: props.coordinator?._id });
      console.log(tem.data);
      if (tem.data.status === '1') {
        alertBox.remove();
      } else {
        toast.error('error occure in due to server', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  
    // Add event listener to the close button
    const closeBtn = alertBox.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      // Remove the alert box
      alertBox.remove();
    });

      
      //window.location.reload();
      props.savechage(newData);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  if (props.coordinatorList) {
    console.log("hiii")
    console.log(props.departmentList)
    return (
      <>
        {/* <div className="card m-2 card-style card-size">
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
        </div> */}

        <table class="table table-hover ">
          <thead>
            <tr>
              <th scope="col" >Department</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.coordinatorList &&
              props.coordinatorList.map((coordinator) => (
                <tr key={coordinator?._id}>
                  <td scope="row">{coordinator?.Department || coordinator?.department}</td>
                  <td scope="row">{coordinator?.name}</td>
                  <td scope="row">{coordinator?.email}</td>
                  <td scope="row">
                    <button
                      className="btn btn-primary btn-style mr-2"
                      onClick={() => navigate(`/allfaculty/${coordinator?._id}`)}
                    >
                      View All Faculty
                    </button>
                    <button
                      className="btn btn-danger btn-style"
                      onClick={() => props.savechange(props.coordinatorList.filter(c => c._id !== coordinator._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>


      </>
    );
  } else {
    return (
      <>
        {/* <div className="card m-2">
          <div className="card-header">
            <b>{props.coordinator?.department}</b>
          </div>
          <button className="btn btn-primary m-2" onClick={deletedepartment}>
            Delete
          </button>
        </div> */}
      </>
    );
  }
};
export default CoordinatorList;
