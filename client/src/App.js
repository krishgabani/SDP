import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from "./components/Upload";
import Login from "./components/Login";
import Journal from "./components/Journal"
import Register from "./components/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/login' element={<Login/>} />   
            <Route path='/senddata' element={<Upload/>} />
            <Route path='/journal' element={<Journal/>} />
            <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
