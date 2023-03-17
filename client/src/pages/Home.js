import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import "../styles/Home.css";
import axios from "axios";
import CoordinatorList from "../components/CoordinatorList";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


const Home = ({ cookies, removeCookies }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [coordinatorList, setcoordinatorList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [depart, setdepart] = useState('');
  const [year, setYear] = useState('');
  const [allyears, allsetYears] = useState([]);
  // const { user } = useSelector((state) => state.user);

  const getYears = async ()=> {
    try{
      const tem = await axios.get("http://localhost:5000/api/admin/years");
       console.log(tem.data?.allyear);
      return tem.data?.allyear;
    }catch(error){
      console.log(error);
      console.log("Error Occurs in Years");
    }
  }

  const setYears = async (year)=> {
    const tem = await axios.post("http://localhost:5000/api/admin/addnewyear",{Year:year});
      if(tem.data.success === 0) {
        toast.error("" + tem.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });        
      }
      const tem2 = await axios.get("http://localhost:5000/api/admin/years");
      return tem2.data?.allyear;
  }

  useEffect(()=>{
    getYears().then(data=>allsetYears(data));
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setYears(year).then(data => {
        allsetYears([...data])
        setYear('')
        return data;        
      })
    }catch(error){
      console.log(error);
      console.log("Error Occurs in Years");
    }
  }

  console.log(coordinatorList);

  if (user?.Designation === "Admin") {
    return (
      <Layout removeCookies={removeCookies}>
        <>
          <Row>
            <Col className="d-flex">
              <Card style={{ width: "20vw", margin: "10px"}}>
                <Card.Img variant="top" src="https://gcdnb.pbrd.co/images/DQ7Jfyr1IQNj.png?o=1" />
                <Card.Body>
                  <Card.Title>Departments</Card.Title>
                  <Card.Text>
                    List of the Various Departments at Dharmsinh Desai University in Nadiad.
                  </Card.Text>
                  <Button onClick={() => navigate("admin/departments")} variant="primary">Explore</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex">
              <Card style={{ width: "20vw", margin: "10px"}}>
                <Card.Body>
                  <Card.Title>Start of a new academic year?</Card.Title>
                  <Card.Text>
                    <form className="add-year-form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Enter"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        required
                        style={{ display: 'inline-block', marginRight: '10px' }}
                      />
                      <button type="submit" style={{ display: 'inline-block' }}>Add</button>
                    </form>
                    <div className="years-list-container">
                      <h4>List of years {allyears.length}</h4>
                        <ul style={{height:"200px",overflow: "hidden", overflowY: "scroll"}} className="years-list">
                          {allyears && allyears.map((year) => (
                            <li key={year?._id}>{year?.year}</li>
                          ))}
                        </ul>
                    </div>
                  </Card.Text>
                  {/* <Button onClick={() => navigate("admin/AllYears")} variant="primary">Add</Button> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      </Layout>
    );
  }else{
    return(
      <Layout removeCookies={removeCookies}>
        <h1>Home</h1>
      </Layout>
    );
  }

};

export default Home;
