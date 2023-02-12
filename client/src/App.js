import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from "./components/Upload";
import Login from "./components/Login";
import Journal from "./components/Journal"
import Register from "./components/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EmailVerify from './components/EmailVerify'
import VerifyEmail from "./components/VerifyEmail";
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';

function App() {
  const {loading} = useSelector(state=>state.alerts)
  return (
    <>
      <Router>
      {loading ? <Spinner/> :
      <Routes>
            <Route path='/login' element={<Login/>} />   
            <Route path='/senddata' element={<Upload/>} />
            <Route path='/journal' element={<Journal/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
            <Route path='/user/:id/adminverify/:token' element={<VerifyEmail />}/>
        </Routes>
      }

      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
