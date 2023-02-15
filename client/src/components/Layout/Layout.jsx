import React, { useEffect } from 'react'
import axios from 'axios'
import "../../styles/LayoutStyles.css"
import {Link,useNavigate,useLocation} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';

import { Badge } from 'antd';
import { adminMenu, coordinatorMenu , userMenu } from './data';

import {message} from 'antd'

function Layout({children,removeCookies}) {
  const {user} = useSelector(state => state.user)
  //console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("hellow");
    removeCookies('token');
    message.success('logout successfully');
    navigate('/login')
  }
  let SidebarMenu = coordinatorMenu;

  //console.log(user.data.Designation);
  // if(user.Designation === 'coordinator') {
  //   console.log("hii");
  //    SidebarMenu = coordinatorMenu;
  // }
  return (
    <div className="main">                                                
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h6>RPMS</h6>
                </div>
                <hr />
                <div className="menu">
                
                  {SidebarMenu.map(menu => {
                    const isActive = location.pathname === menu.path;
                    return (
                      <>
                        <div className={`menu-item ${isActive && "active"}` }>
                          <i className={menu.icon}></i>
                          <Link to={menu.path}>{menu.name}</Link>
                        </div>
                      </>
                    )
                  }) }
                  <div className={`menu-item `} onClick={handleLogout}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <Link to='/login'>LogOut</Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                  <div className="header-content">
                    {/* <i className="fa-solid fa-bell"></i> */}
                    <Link to='/profile'>{user?.name}</Link>
                  </div>
                </div>   
                <div className="body">{children}</div>
            </div>
        </div>
    </div>
  )
}

export default Layout