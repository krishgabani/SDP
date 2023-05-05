import "../styles/Login.css";
import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, message } from "antd";
import { userAll } from "../redux/features/userSlice";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Login = ({ setCookies }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //console.log(user);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      //console.log(e);
      console.log("fdfd");
      console.log(user);
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        user
      );

      dispatch(hideLoading());

      console.log(res.data.message);

      if (res.data.success) {
        console.log(res.data.token);
        setCookies("token", res.data.token);

        toast.success("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // navigate("/Journal");
        console.log(user);
        // console.log(res.data);
        if(user.email === 'admin@gmail.com') {
          navigate("/");
        }else{
          navigate("/Journal");
        }
        
      } else {
        dispatch(hideLoading());
        toast.error("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Incurrect data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h2>
                <a>Login to your account</a>
              </h2>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                  <form id="stripe-login" onSubmit={onSubmit}>
                    <div class="form-group padding-bottom--24">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="form-group padding-bottom--24">
                      <label for="password">Password</label>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={user.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="reset-pass">
                        <a href="#">Forgot your password?</a>
                      </div>
                    </div>

                    <div>
                      <input
                        type="submit"
                        name="submit"
                        value="LOGIN"
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          "background-color": "rgb(84, 105, 212)",
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Don't have an account? <a href="/register">Sign up</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
