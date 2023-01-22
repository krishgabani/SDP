import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const onSubmit = (e) => {
  e.preventDefault()

  console.log(e);
  toast.success('Success Notification !', {
    position: toast.POSITION.TOP_RIGHT
});

}

const Login = () => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Enter Your Email: </label>
        <input type="text" />
        <label> Enter Your Password : </label>
        <input type="text" />
        <button type='submit'>Submit</button>
      </form>
      
    </div>
  )
}

export default Login
