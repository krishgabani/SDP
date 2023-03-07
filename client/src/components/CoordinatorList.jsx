import React from 'react'
import {useNavigate} from 'react-router-dom'


const CoordinatorList = ({coordinator}) => {
    const navigate  = useNavigate();
  return (
    <>
        <div className="card m-4" style={{cursor:"pointer"}} onClick={() => navigate(`/allfaculty/${coordinator._id}`)}> 
            <div className="card-header" >
                Department : <b>{coordinator.Department}</b>     
            </div>
            <div className="card-body">
            <p>
                <b>Name :</b> {coordinator.name}
            </p>
            <p>
                <b>Email :</b> {coordinator.email}
            </p>
            <button className='m-2'>View All Faculty</button>
            </div>
        </div>
    </>
  )
}

export default CoordinatorList

