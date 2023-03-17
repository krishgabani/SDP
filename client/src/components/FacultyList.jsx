import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const FacultyList = ({faculty}) => {
    const navigate  = useNavigate();
    const deleteFaculty = async () => {
      try{
        // const tem = await axios.put("http://localhost:5000/api/admin/deleteFaculty",{fact: faculty?._id});
        // console.log(tem.data);
      }catch(error){
        console.log(error);
      }
    }

  return (
    <>
        <div className="card m-4" > 
                <div className="card-header" >
                    Name : <b>{faculty?.name}</b>     
                </div>
                <div className="card-body">
                <p>
                    <b>Email :</b> {faculty?.email}
                </p>
                {/* <button className='m-2'>View</button> */}
                <button className='m-2' onClick={deleteFaculty}>Delete</button>
                </div>
                </div>
    </>
  )
}

export default FacultyList