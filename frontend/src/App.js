import logo from './logo.svg';
import './styles/App.css';

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import bodyLogo from './assets/body.png'
import bottomLogo from './assets/belowLogo.png'
import sideLogo from "./assets/side.png"
import Login from './components/Login/index';
import toast from 'react-hot-toast'
import { getUser } from './apis/user';
import { getAdmin } from './apis/admin';
import { useContext, useEffect } from 'react';
import userContext from './context/user/userContext';
import adminContext from './context/admin/adminContext';


function App() {

  const {user, setUser}= useContext(userContext)
  const {admin, setAdmin} = useContext(adminContext)
  const navigate = useNavigate()
  const location= useLocation()
  const checkLogin= async()=>{
    const token= localStorage.getItem("token")
    if(!token){
       if(location.pathname!="/"){
        navigate("/")
        return
       }
    }
    try{
    
      const res1= await getUser(token,null)
      
      setUser(res1.user)
      if(location.pathname=="/"){
        navigate("/userHome")
        return
      }
      
    }catch(e){
    
       try{

        const res2= await getAdmin(token)
        setAdmin(res2.user)
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
   
  
   
    
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    <img src={bodyLogo} className="bodyLogo"/>
    <img  src={bottomLogo} className='bottomLogo'/>
    {/* <img src={sideLogo} className="sideLogo"/> */}

    </div>
   
  );
}

export default App;