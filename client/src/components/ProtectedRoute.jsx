import axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'
import { hideLoading,showLoading } from '../redux/features/alertSlice'
import { userAll } from '../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children, cookies, removeCookies }) {
    const {token} = cookies;

    console.log(token)
    console.log("hii")

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.user);

    const navigate = useNavigate();

//life Cycle method would be called

    useEffect(()=> {
        //console.log("user protect")
        const getUser = async () => {
            try{
                dispatch(showLoading());
                const res = await axios.get('http://localhost:5000/api/user/getUserData',
                    {
                        headers: {
                            Authorization : 'Bearer ' + token
                        }
                    }  
                )
                dispatch(hideLoading());
                //console.log(res.data)
                if(res.data.success) {

                    dispatch(userAll(res.data.data));
                }else{
                    removeCookies('token')
                    navigate('/login');
                }
            }catch(error) {
                removeCookies('token');
                dispatch(hideLoading());
            }
        }
        if(!user) {
            getUser();
        }
    },[])

    if(token) {
        return (
            children
        )
    }else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute
