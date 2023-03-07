import React from 'react'
import {useNavigate} from 'react-router-dom'

const FacultyList = ({faculty}) => {
    const navigate  = useNavigate();
  return (
    <>
        <div className="card m-4" > 
                <div className="card-header" >
                    Name : <b>{faculty.name}</b>     
                </div>
                <div className="card-body">
                <p>
                    <b>Email :</b> {faculty.email}
                </p>
                
                </div>
                </div>
    </>
  )
}

export default FacultyList