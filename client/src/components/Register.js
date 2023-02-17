import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { React, useState } from "react";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

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

  const myregister = async () => {
    try {
      console.log(user);
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        user
      );
      console.log("connect");
      dispatch(hideLoading());
      console.log(res.data.message);
      toast.success("" + res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.success("error", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("error is occur");
    }
  };

  return (
    // <>
    //   <form action="">
    //     Name : <input type="text" name="name" onChange={handleChange} />
    //     <br />
    //     Email : <input type="email" name="email" onChange={handleChange} />
    //     <br />
    //     password :{" "}
    //     <input type="password" name="password" onChange={handleChange} />
    //     <br />
    //     {/* Designation : <input type="text" name="Designation" onChange={handleChange}/><br/>
    //         Department : <input type="text" name="Department" onChange={handleChange}/><br/> */}
        // Designation :
        // <span onChange={handleChange}>
        //   <input type="radio" value="faculty" name="Designation" /> Faculty
        //   <input type="radio" value="hod" name="Designation" /> HOD
        //   <input type="radio" value="coordinator" name="Designation" />{" "}
        //   Coordinator
        // </span>
    //     <br />
    //     {/* Department : <input type="text" name="Department" onChange={handleChange}/><br/> */}
    //     Department :
    //     <select name="Department" id="Department" onChange={handleChange}>
    //       <option value="it">IT</option>
    //       <option value="ce">CE</option>
    //       <option value="ec">EC</option>
    //       <option value="ic">IC</option>
    //     </select>
    //     <br />
    //     <button type="submit" onClick={myregister}>
    //       Submit
    //     </button>
    //   </form>
    // </>

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
                <a>Sing Up to your account</a>
              </h2>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                  <form id="stripe-login">
                  <div className="field padding-bottom--24">
                      <label for="email">Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field padding-bottom--24">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label for="password">Password</label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div  >
                      Designation :
                      <span onChange={handleChange}>
                        <input type="radio" value="faculty" name="Designation" /> Faculty
                        <input type="radio" value="hod" name="Designation" /> HOD
                        <input type="radio" value="coordinator" name="Designation" />{" "}
                        Coordinator
                      </span>
                    </div>
                    <div className="field padding-bottom--24">
                        {/* <div for="password"></div>  */}
                        Department : 
                        <select name="Department" id="Department" onChange={handleChange}>
                          <option value="it">IT</option>
                          <option value="ce">CE</option>
                          <option value="ec">EC</option>
                          <option value="ic">IC</option>
                        </select>
                    </div>
                    <div className="field padding-bottom--24">
                      <input type="submit" name="submit" value="LOGIN" onClick={myregister}/>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Have an account? <a href="/login">Login</a>
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
