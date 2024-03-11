import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { adminLogin, userLogin } from '../../apis/auth'
import './index.css'
import {useLocation, useNavigate} from 'react-router-dom'
import userContext from '../../context/user/userContext'
import adminContext from '../../context/admin/adminContext'
const CLIENT_ID="926213978565-6fl0mct538cqju1c2g0mm598hg1onami.apps.googleusercontent.com"
const REDIERECT_URL= "https://centralgymregistration.yash.mdgspace.org/"

const Login = () => {

  const location = useLocation();
  const navigate= useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const {user, setUser} = useContext(userContext)
  const {admin, setAdmin} = useContext(adminContext)
  const [userName, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
 function loginWithGoogle() {
      const authUrl= 'https://accounts.google.com/o/oauth2/auth'+'?response_type=code'+`&client_id=${CLIENT_ID}`+ `&redirect_uri=${REDIERECT_URL}`+'&scope=email profile'
      window.location.assign(
        authUrl
      );
    }
  const initFun= async()=>{

    const code = searchParams.get('code');
    if(code!=null){
     const func= async()=>{
      
   
      const res= await userLogin(code)

      const token= res.access_token
      setUser(res.user)
      localStorage.setItem("token",token)
      navigate("/studentDetails/"+res.user.email)

     }

    toast.promise(
      func(),
       {
         loading: 'Logging in...',
         success: <b>Login successfull</b>,
         error: <b>Invalid Email</b>,
       }
     );
    

    
    }

  }

  const handleAdminLogin= async()=>{
    
    if(userName&&password){
      
      const func= async()=>{
      
        const res= await adminLogin(userName, password)
    
        const token= res.access_token
        
        setAdmin("admin")
        localStorage.setItem("token",token)
        navigate("/viewSlots")
        return


      }
      toast.promise(
        func(),
         {
           loading: 'Logging in...',
           success: <b>Login successfull</b>,
           error: <b>Invalid Credentials</b>,
         }
       );

    }else{
      toast.error("Invalid inputs")
    }
  }

  useEffect(()=>{
      initFun()
  },[searchParams.get('code')])

  return (
    <div>
       <div className='login'>
          <div className='loginBox'>
            <p>Login as Admin</p>
          <div className='inputDiv'>
            <h1 className='h1'>Username</h1>
            <input onChange={(e)=>setUsername(e.target.value)}  value={userName?userName:""}/>
           
          </div>
          <div className='inputDiv'>
            <h1 className='h1'>Password</h1>
            <input onChange={(e)=> setPassword(e.target.value)} value={password?password:""}/>
          </div>
          <button className='bt' onClick={handleAdminLogin}>Login</button>
          </div>
          <div className='loginBox'>
            <p>Login as Cyntral Gym User</p>
            <button className='bt' onClick={loginWithGoogle}>Login with IITR Email ID</button>
           
          </div>
       </div>
     
    </div>
  )
}

export default Login
