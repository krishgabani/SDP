import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { React , useState } from 'react';

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    Designation: "",
    Department: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const myregister = () => {
      console.log(user);
      axios.post('http://localhost:5000/api/user/register',user).then((res) => {
        console.log("connect");
        console.log(res.data);
        toast.success('hii there',{
          position: toast.POSITION.TOP_RIGHT
        });
      }).catch((err) => {
        console.log("error is occur");
      })
  }
  
   return (
    <>
        <form action="" >
            Name : <input type="text" name="name" onChange={handleChange}/><br/>
            Email : <input type="email" name="email" onChange={handleChange}/><br/>
            password : <input type="password" name="password" onChange={handleChange}/><br/>
            Designation : <input type="text" name="Designation" onChange={handleChange}/><br/>
            Department : <input type="text" name="Department" onChange={handleChange}/><br/>
            <button type="submit" onClick={myregister}>Submit</button>
        </form>

    </>
  )
}

export default Register