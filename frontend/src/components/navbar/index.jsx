import React, { useContext } from 'react'
import './index.css'
import iitrLogo from '../../assets/iitrLogo.png'
import { Link } from 'react-router-dom'
import userContext from '../../context/user/userContext'
import adminContext from '../../context/admin/adminContext'
const Navbar = () => {
  const {user}= useContext(userContext)
  
  return (
    <nav >
        <label className="logo" >
            <img src={iitrLogo}/>
        </label>
         <ul>
           {user&& <li><Link to={"/studentDetails/"+user.email}  className='a'>Student Details</Link></li>}
            <li><Link href="#" className='a'>View Slot</Link></li>
         </ul>
         
    </nav>
  )
}

export default Navbar
