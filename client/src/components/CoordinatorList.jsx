import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import {useNavigate} from 'react-router-dom'
import "../styles/CoordinatorList.css"
import axios from 'axios'

const CoordinatorList = ({coordinator}) => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const deletecoordinator = async () => {
        console.log(coordinator?._id);
        try{
            const tem = await axios.put("http://localhost:5000/api/admin/deleteCoordinator",{deprt: coordinator?._id});
            console.log(tem.data);
            //window.location.reload();
        }catch(error){
            console.log(error);
            
        }
    }

    const deletedepartment = async () => {
        
        try{
            const tem = await axios.put("http://localhost:5000/api/admin/deletedepartment",{deprt: coordinator?._id});
            window.location.reload();
        }catch(error){
            dispatch(hideLoading());
            console.log(error);
        }
    }
    if(coordinator?.email){
        return (
            <>
                <div className="card m-4 card-style" > 
                    <div className="card-header" >
                        <b>{coordinator?.Department}</b>     
                    </div>
                    <div className="card-body">
                    <p>
                        <b>Name :</b> {coordinator?.name}
                    </p>
                    <p>
                        <b>Email :</b> {coordinator?.email}
                    </p>
                    <button className='m-2'>View</button>
                    <button className='m-2' onClick={() => navigate(`/allfaculty/${coordinator?._id}`)}>View All Faculty</button>
                    <button className='m-2' onClick={deletecoordinator}>Delete</button>
                    </div>
                </div>

            </>
          )
    }else{
        return(
            <>
            <div className="card m-4"> 
                <div className="card-header" >
                   <b>{coordinator?.department}</b>     
                </div>
                <button className='m-2' onClick={deletedepartment}>Delete</button>
            </div>
            
            </>
        )
    }
}
export default CoordinatorList

