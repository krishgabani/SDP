import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {Row} from 'antd'
import FacultyList from '../components/FacultyList';


const Allfaculty = ({ cookies, removeCookies }) => {

  const [allfacultylist, setAllfacultyList] = useState([]);
  const [updateList,setupdateList] = useState(false);

  const { user } = useSelector((state) => state.user);

  const params = useParams();

  useEffect(() => {
    const Allfacultydata = async () => {
      try{
        const tem = await axios.post("http://localhost:5000/api/admin/getAllfacultyById", { coordinatId: params.coordinatId });
        console.log(tem.data.data);
        setAllfacultyList(tem.data.data);
        //console.log(allfacultylist[0].Department);
      }catch(error) {
        console.log(error);
        console.log("Error while getting allfaculty")
      }

    }
    Allfacultydata();
  }, [updateList])

  return (
    <Layout removeCookies={removeCookies}>
      <>
      <h1 className="text-center">{allfacultylist && allfacultylist[0]?.Department}</h1>
        <Row>
          {allfacultylist && <FacultyList  allfacultylist={allfacultylist} onsavechange={setAllfacultyList} updatechange={setupdateList}/>}
        </Row>
      </>
    </Layout>
  )
}

export default Allfaculty