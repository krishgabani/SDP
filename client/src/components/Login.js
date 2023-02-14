
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { React , useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //console.log(user);
  };
  
    const onSubmit = async (e) => {
      try{
          e.preventDefault()
        
          //console.log(e);
          console.log(user);
          const res = await axios.post('http://localhost:5000/api/user/login',user);
        
          console.log(res.data.message);
          toast.success(""+res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          if(res.data.success) {
            navigate('/');
          }
      }catch(error) {
          toast.error("Incurrect data",{
            position: toast.POSITION.TOP_RIGHT
          })
      }
    
    }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Enter Your Email: </label>
        <input type="email" name="email" value={user.email} onChange={handleChange}/>
        <label> Enter Your Password : </label>
        <input type="text" name="password" value={user.password} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
