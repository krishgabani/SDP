import { React, useState } from "react";
import Layout from '../components/Layout/Layout'
import axios from "axios";

const Department = () => {
    const [depart,setdepart] = useState({
        department:""
    });

    const sethandler = (e) => {
        const { name, value } = e.target;
        setdepart({
            ...depart,
            [name]: value,
        })
        console.log(depart);
    }

    const editdepartment = async () => {
        const res = await axios.post("http://localhost:5000/api/user/editdepartment",depart);
        console.log(res.data);
    }
  return (
    <Layout>
        Add Department <input type="text" name="department" value={depart.department} onChange={sethandler}/>
        <input type="submit" onClick={editdepartment}/> 
    </Layout>
  )
}

export default Department