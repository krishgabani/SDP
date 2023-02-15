
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Form, Input, message }  from 'antd'
import { React , useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import "../styles/RegisterStyles.css"
import { useDispatch,useSelector } from 'react-redux'
import { userAll } from '../redux/features/userSlice'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
const Login = ({setCookies}) => {

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
    console.log(user);
  };
  
    const onSubmit = async (e) => {
      try{
          e.preventDefault()
        
          //console.log(e);
          console.log("fdfd");
          console.log(user);
          dispatch(showLoading())
          const res = await axios.post('http://localhost:5000/api/user/login',user);

          dispatch(hideLoading())
        
          console.log(res.data.message);

          if(res.data.success) {
              console.log(res.data.token);
              setCookies('token',res.data.token);

              toast.success(""+res.data.message, {
                position: toast.POSITION.TOP_RIGHT
              });
              navigate('/');
          }else{
              dispatch(hideLoading());
              toast.error(""+res.data.message, {
                position: toast.POSITION.TOP_RIGHT
              });
          }
      }catch(error) {
          toast.error("Incurrect data",{
            position: toast.POSITION.TOP_RIGHT
          })
      }
    }


  return (
    <div>
      <div className="form-container">
        <form layout='vertical' onSubmit={onSubmit} className="register-form">
          <h3 className='text-center'>Login From</h3>
              <Form.Item label="Enter Your Email: ">
                  <Input type="email" name="email" value={user.email} onChange={handleChange} required/>
              </Form.Item>
              <Form.Item label="Enter Your Password : ">
                  <Input type="text" name="password" value={user.password} onChange={handleChange} required/>
              </Form.Item>
              <Link to='/register' className='m-2'>
                      Not a User Register here
              </Link> 
              <button className='btn btn-primary' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
