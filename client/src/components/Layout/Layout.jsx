import React, { useEffect } from "react";
import axios from "axios";
import "../../styles/Layout.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Badge } from "antd";
import { adminMenu, coordinatorMenu, hodMenu, facultyMenu } from "./data";

import { message } from "antd";

function Layout({ children, removeCookies }) {
  const { user } = useSelector((state) => state.user);
  //console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("hellow");
    removeCookies("token");
    message.success("logout successfully");
    navigate("/login");
  };
  let SidebarMenu = adminMenu;
  // console.log(user);
  console.log(user?.Designation);
  if (user?.Designation === "coordinator") {
    console.log("hii");
    SidebarMenu = coordinatorMenu;
  } else if (user?.Designation === "faculty") {
    SidebarMenu = facultyMenu;
  } else if (user?.Designation === "hod") {
    SidebarMenu = hodMenu;
  }
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>RPMS</h6>
          </div>
          <hr />
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">LogOut</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              {/* <i className="fa-solid fa-bell"></i> */}
              <Link to="/profile">{user?.name}</Link>
              <span>{user?.Designation}</span>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
