import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {Row} from 'antd'
import FacultyList from '../components/FacultyList';


const Allfaculty = ({ cookies, removeCookies }) => {

  const [allfacultylist, setAllfacultyList] = useState([]);

  const { user } = useSelector((state) => state.user);

  const params = useParams();

  useEffect(() => {
    const Allfacultydata = async () => {
      const tem = await axios.post("http://localhost:5000/api/admin/getAllfacultyById", { coordinatId: params.coordinatId });
      console.log(tem.data.data);
      setAllfacultyList(tem.data.data);
      //console.log(allfacultylist[0].Department);
    }
    Allfacultydata();
  }, [])

  return (
    <Layout removeCookies={removeCookies}>
      <>
      <h1 className="text-center">{allfacultylist && allfacultylist[0]?.Department}</h1>
        <Row>
          {allfacultylist && allfacultylist.map((faculty) => <FacultyList faculty={faculty} />)}
        </Row>
      </>
    </Layout>
  )
}

export default Allfaculty