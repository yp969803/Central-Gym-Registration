import React, { useContext, useState } from 'react'
import userContext from '../../context/user/userContext'
import {useParams} from 'react-router-dom'
import { getUser } from '../../apis/user'

const StudentDetails = () => {
   const {user} = useContext(userContext)
   const {email} = useParams()
   const [user_det, setUserDet]= useState(null)
   const token = localStorage.getItem('token')
   const fetchData=  async ()=>{
    if(email!= user.email&&token){
        try{
            const res= await getUser(token , email)
            setUserDet(res.user)
        }catch(e){
        
        }
        
    }else{
        setUserDet(user)
    }
   }
  return (
    <div>
       <div className="container text-center">
        <div className="row">
            <div className="col-4">
                hello
            </div>
            <div className="col-8">
                world
            </div>
        </div>
       </div>
    </div>
  )
}

export default StudentDetails
