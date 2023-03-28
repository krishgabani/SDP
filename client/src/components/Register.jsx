import "../styles/Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { React, useState } from "react";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { userVerify } from "../Action/verification/userVerification";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    Designation: "",
    Department: "",
    reEnterPassword: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //console.log(user);
  };

  const myregister = async (e) => {
    e.preventDefault();
    try {
      console.log(user);

      dispatch(showLoading());

      const response = await userVerify(user);
      console.log(response)
      if(response.status === '0') {
        console.log("resp");
        toast.error("" + response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else if(response.status === '1') {
        
         const res = await axios.post("http://localhost:5000/api/user/register",user);
        
        //console.log(res.data.message);
        if(res.data.status === '0') {
          toast.error("" + res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }else if(res.data.status === '1') {
          toast.success("" + res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }else{
          toast.error("Server Error", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }else{
        toast.error("" + response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      dispatch(hideLoading());
    } catch (error) {
      
      dispatch(hideLoading());
      toast.error("error", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("error is occur");
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
            className="box-root  flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--24 padding-bottom--12 flex-flex flex-justifyContent--center">
              <h2>
                <a>Create a new account</a>
              </h2>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                  <form id="stripe-login" onSubmit={myregister}>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        // placeholder="Your professional name here"
                        required
                      />
                    </div>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="Designation">Designation</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="faculty"
                          name="Designation"
                          id="faculty"
                          onChange={handleChange}
                          // checked
                        />
                        <label className="form-check-label" htmlFor="faculty">
                          Faculty
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="hod"
                          id="hod"
                          name="Designation"
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="hod">
                          HOD
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="coordinator"
                          id="coordinator"
                          name="Designation"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="coordinator"
                        >
                          Coordinator
                        </label>
                      </div>
                    </div>

                    <div className="form-group padding-bottom--24">
                      <label htmlFor="Department">Department</label>
                      <select
                        name="Department"
                        id="Department"
                        onChange={handleChange}
                        className="form-select"
                        // defaultValue={"Information Technology"}
                      >
                        <option value="department" onChange={handleChange}>
                          Department
                        </option>
                        <option value="Information Technology" onChange={handleChange}>
                          Information Technology
                        </option>
                        <option value="Computer Engineering">
                          Computer Engineering
                        </option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Electrical Engineering">
                          Electrical Engineering
                        </option>
                        <option value="Chemical Engineering">
                          Chemical Engineering
                        </option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="submit"
                        name="submit"
                        value="SIGNUP"
                        // onClick={myregister}
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(84, 105, 212)",
                        }}
                        >
                        Sig Up
                        </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--12 padding-bottom--12">
                <span>
                  Already have an account? <a href="/login">Login</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
