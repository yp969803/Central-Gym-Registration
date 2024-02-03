import React, { useContext } from 'react'
import './index.css'
import iitrLogo from '../../assets/iitrLogo.png'
import { Link , useNavigate} from 'react-router-dom'
import userContext from '../../context/user/userContext'
import adminContext from '../../context/admin/adminContext'
const Navbar = () => {
  const {user}= useContext(userContext)
  const {admin}= useContext(adminContext)
  const navigate = useNavigate()
  
  const LogoutHandler= ()=>{
    localStorage.removeItem('token')
    navigate('/')
    
  }
  return (
    <nav className='nav'>
        <label className="logo" >
            <img src={iitrLogo}/>
        </label>
         <ul>
           {user&& <li><Link to={"/studentDetails/"+user.email}  className='a'>Student Details</Link></li>}
           {(user!=null || admin!=null)&& <li><Link to="/viewSlots" className='a'>View Slot</Link></li>}
           {(user!=null || admin!=null)&&<li ><a className='a b' onClick={LogoutHandler}>LogOut</a></li>}
         </ul>
         
    </nav>
  )
}

export default Navbar
