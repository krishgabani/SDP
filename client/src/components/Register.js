import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { React , useState } from 'react';
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import { useDispatch } from 'react-redux'

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
    try{
      console.log(user);
      dispatch(showLoading());
      const res = await axios.post('http://localhost:5000/api/user/register',user)
        console.log("connect");
      dispatch(hideLoading());
        console.log(res.data.message);
        toast.success(""+res.data.message,{
          position: toast.POSITION.TOP_RIGHT
      })
    }catch(error){
        toast.success('error',{
          position: toast.POSITION.TOP_RIGHT
        });
        console.log("error is occur");
    }
  }
  
   return (
    <>
        <form action="" >
            Name : <input type="text" name="name" onChange={handleChange}/><br/>
            Email : <input type="email" name="email" onChange={handleChange}/><br/>
            password : <input type="password" name="password" onChange={handleChange}/><br/>
            {/* Designation : <input type="text" name="Designation" onChange={handleChange}/><br/>
            Department : <input type="text" name="Department" onChange={handleChange}/><br/> */}
            Designation :
          <span onChange={handleChange}>
            <input type="radio" value="faculty" name="Designation"/> Faculty
            <input type="radio" value="hod" name="Designation" /> HOD
            <input type="radio" value="coordinator" name="Designation" /> Coordinator
          </span><br/>
        {/* Department : <input type="text" name="Department" onChange={handleChange}/><br/> */}
          Department :
          <select name="Department" id="Department" onChange={handleChange}>
            <option value="it">IT</option>
            <option value="ce">CE</option>
            <option value="ec">EC</option>
            <option value="ic">IC</option>
          </select><br/>

            <button type="submit" onClick={myregister}>Submit</button>
        </form>

    </>
  )
}

export default Register