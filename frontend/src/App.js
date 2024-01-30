import logo from './logo.svg';
import './styles/App.css';

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import bodyLogo from './assets/body.png'
import bottomLogo from './assets/belowLogo.png'
import sideLogo from "./assets/side.png"
import Login from './components/Login/index';
import Toaster,{toast} from 'react-hot-toast'
import { getUser } from './apis/user';
import { getAdmin } from './apis/admin';
import { useEffect } from 'react';


function App() {

  const navigate = useNavigate()
  const location= useLocation()
  const checkLogin= async()=>{
    const token= localStorage.getItem("token")
    if(!token){
       if(location.pathname!="/"){
        navigate("/")
       }
    }
    try{

      const res1= await getUser(token)
      if(location.pathname=="/"){
        navigate("/userHome")
      }
      
    }catch(e){
       try{

        const res2= await getAdmin(token)
        if(location.pathname=="/"){
          navigate("/adminHome")
        }
       }catch(e){
        if(location.pathname!="/"){
          navigate("/")
         }
       }
    }
  }

  useEffect(()=>{
    checkLogin()
  },[])
  
  return (
    <div>
      <Toaster/>
  
   
    
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    <img src={bodyLogo} className="bodyLogo"/>
    <img  src={bottomLogo} className='bottomLogo'/>
    <ing src={sideLogo} className="sideLogo"/>

    </div>
   
  );
}

export default App;
