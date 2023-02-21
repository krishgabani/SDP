import { React, useEffect,useState } from "react";
import Layout from '../components/Layout/Layout'
import axios from "axios";
import "../styles/Department.css"

const Department = () => {
    const [departmentList,setDepartmentList] = useState([]);
    const [depart,setdepart] = useState({
        department:""
    });
    const departmentListHtml = departmentList.map((value) => <h3>{value}</h3>)
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
            //console.log(tem.data);  
            let deplist = tem.data.data;
            let mylist = deplist.map((dep)=>dep.department)
            setDepartmentList(mylist);
        }
        getAllDepartment();
        // if(!departmentList) {
        //     getAllDepartment();
        // }
        
    },[])
    const editdepartment = async () => {
        const res = await axios.post("http://localhost:5000/api/user/editdepartment",depart);
        console.log(res.data);
    }

  return (
    <Layout>
        Add Department <input type="text" name="department" value={depart.department} onChange={sethandler}/>
        <input type="submit" onClick={editdepartment}/> 
        {departmentListHtml}
    </Layout>
  )
}

export default Department