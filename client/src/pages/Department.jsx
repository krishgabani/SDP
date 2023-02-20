import { React, useEffect,useState } from "react";
import Layout from '../components/Layout/Layout'
import axios from "axios";

const Department = () => {
    const [alldepartment,setAllDepartment] = useState([]);
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
    useEffect(() => {
        const getAllDepartment = async () => {
            const tem = await axios.post("http://localhost:5000/api/user/getdepartment");
            console.log(tem.data);  
        }
        getAllDepartment();
    })
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