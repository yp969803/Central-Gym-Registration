import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../context/user/userContext'
import {useParams} from 'react-router-dom'
import { changeUserSlot, getAllSlots, getUser, getUserImage, uploadUserImage } from '../../apis/user'
import profileDummy from '../../assets/profileDummy.png'
import toast from  'react-hot-toast'
const StudentDetails = () => {
   const {user, setUser} = useContext(userContext)
   const {email} = useParams()
   const [user_det, setUserDet]= useState(null)
   const [file, setFile] = useState(null)
   const [image, setImage]= useState(null)
   const token = localStorage.getItem('token')
   const [slots, setSlots]= useState(null)
   const [userSlot, setUserSlot] = useState(null)

   const fetchData=  async ()=>{
    if(token&&user&&email!= user.email&&token){
        try{
            const res= await getUser(token , email)
            setUserDet(res.user)
        }catch(e){
        
        }
        
        
    }else if(user){
        setUserDet(user)
    }
    if(user_det&&token){
        try{
           const img= await getUserImage(token, user_det.email)
           const objectUrl = URL.createObjectURL(img);
           setImage(objectUrl)

        }catch(e){

        }
    }
   }

   const fetchSlotsData= async()=>{
    if(token){
        try{
            const res= await getAllSlots(token)
        const slots= res.slots
        setSlots(slots)
        }catch(e){
            
        }
    }
   }
   const updateSlot= async()=>{
    if(token&&userSlot){
       const func= async()=>{
        const res= await changeUserSlot(token, userSlot)
        user_det.slot= userSlot
        setUserDet(user_det)
        setUser(user_det)
        
       }
       toast.promise(func(),{
        loading: 'Updating slot',
       success: <b>Slot Updated</b>,
       error: <b>Error occured</b>,

    })

    }
   }

   const upload_Image= async()=>{
    if(token&&file){
        const func= async()=>{
            const res=await uploadUserImage(token,file)
        }
        toast.promise(func(),{
            loading: 'Updating image',
           success: <b>Imgage Updated</b>,
           error: <b>Error occured</b>,

        })
    }else{
        toast.error("No file chosen")
    }
   }
   useEffect(()=>{
     fetchData()
     fetchSlotsData()
   },[user, uploadUserImage])
  return (
  
    <div className='cl container'>
       <div className="container text-center p-3 my-3 cl2">
        <div className="row">
            <div className="col-sm-4 p-4">
               
                  <div className="container ">
                  <img  className=" custom-image" height="300" width="300" src={image?image:profileDummy} />
                  </div>
                {user&&email&&user.email==email&&<><input  type="file" onChange={(e)=>setFile(e.target.files[0])} />
                <button onClick={upload_Image}>Update image</button></>}
            </div>
            {user_det&&<div className="col-sm-8">
               <p>{user_det.name}</p>
               <p>{user_det.email}</p>
               <p>{user_det.enrollment}</p>
               <p>{user_det.branch}</p>
               <p>{user_det.slot!="null"?user_det.slot:"No slot chosen"}</p>
               <button onClick={updateSlot}>Update Slot</button>
               {slots&&<div>
                  {slots.map(slot=>{
                    if(slot.name!=user_det.slot&&slot.totalSeats-slot.filledSeats>0){
                        return <p onClick={()=>setUserSlot(slot.name)}>{slot.name}</p>
                    }
                  })}
                  <p onClick={()=>setUserSlot('null')}>No slot</p>
                </div>}
            </div>}
        </div>
       </div>
    </div>
  )
}

export default StudentDetails
