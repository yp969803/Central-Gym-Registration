import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
const CLIENT_ID="926213978565-6fl0mct538cqju1c2g0mm598hg1onami.apps.googleusercontent.com"
const CLIENT_SECREST= "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"
const REDIERECT_URL= "http://localhost:3000"
const BACKEND_URL="http://localhost:8000"
const Login = () => {
    

    function loginWithGoogle() {
      const authUrl= 'https://accounts.google.com/o/oauth2/auth'+'?response_type=code'+`&client_id=${CLIENT_ID}`+ `&redirect_uri=${REDIERECT_URL}`+'&scope=email profile'
      window.location.assign(
        authUrl
      );
    }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
 
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
  // useEffect(()=>{
  //     initFun()
  // },[])

  return (
    <div>
      <button onClick={loginWithGoogle}>Login</button>
      <button onClick={initFun}>Final</button>
    </div>
  )
}

export default Login
