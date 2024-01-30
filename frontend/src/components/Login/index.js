import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import {useLocation} from 'react-router-dom'
const CLIENT_ID="926213978565-6fl0mct538cqju1c2g0mm598hg1onami.apps.googleusercontent.com"
const CLIENT_SECREST= "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"
const REDIERECT_URL= "http://localhost:3000"
const BACKEND_URL="http://localhost:8000"
const Login = () => {
    

    

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [userName, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
 function loginWithGoogle() {
      const authUrl= 'https://accounts.google.com/o/oauth2/auth'+'?response_type=code'+`&client_id=${CLIENT_ID}`+ `&redirect_uri=${REDIERECT_URL}`+'&scope=email profile'
      window.location.assign(
        authUrl
      );
    }
  const initFun= async()=>{
    try{
    const code = searchParams.get('code');
    if(code!=null){
       const url= BACKEND_URL+"/auth/login"
       const res= await axios.post(url,{
        code: code
       })
       const token= res.data.access_token
       localStorage.setItem("token",token)
    }
  }catch(e) {
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
    console.log(e)
  
  }
  }

  const checkLogin= async()=>{

    try{
      const token= localStorage.getItem(token)
      if(token){
        
      }

    }catch(e){

    }
  }

  useEffect(()=>{
      initFun()
  },[])

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
          <button className='bt'>Login</button>
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
