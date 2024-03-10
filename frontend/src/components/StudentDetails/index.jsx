import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/user/userContext";
import { useParams } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {
  changeUserSlot,
  getAllSlots,
  getUser,
  getUserImage,
  uploadUserImage,
} from "../../apis/user";
import profileDummy from "../../assets/profileDummy.png";
import toast from "react-hot-toast";
import './index.css'
import PdfFile from "../PdfFile";
const StudentDetails = () => {
  const { user, setUser } = useContext(userContext);
  const { email } = useParams();
  const [user_det, setUserDet] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");
  const [slots, setSlots] = useState(null);
  const [userSlot, setUserSlot] = useState(null);
  const [showDropdowm, setShowDropdown]= useState(false)

  const fetchData = async () => {
    
    if (token && user && email != user.email && token) {
      try {
        const res = await getUser(token, email);
        setUserDet(res.user);
      } catch (e) {}
    } else if (user) {
      setUserDet(user);
    }
    if (user_det && token) {
      try {
        const img = await getUserImage(token, user_det.email);
        const objectUrl = URL.createObjectURL(img);
        setImage(objectUrl);
      } catch (e) {}
    }
  };

  const fetchSlotsData = async () => {
    if (token) {
      try {
        const res = await getAllSlots(token);
        console.log(res)
        const slots = res.slots;
        setSlots(slots);
      } catch (e) {}
    }
  };
  const updateSlot = async () => {
    if (token && userSlot) {
      const func = async () => {
        const res = await changeUserSlot(token, userSlot);
        user_det.slot = userSlot;
        setUserDet(user_det);
        setUser(user_det);
      };
      toast.promise(func(), {
        loading: "Updating slot",
        success: <b>Slot Updated</b>,
        error: <b>Error occured</b>,
      });
     
    }
  };

  const upload_Image = async () => {
    if (token && file) {
      const func = async () => {
        const res = await uploadUserImage(token, file);
      };
      toast.promise(func(), {
        loading: "Updating image",
        success: <b>Imgage Updated</b>,
        error: <b>Error occured</b>,
      });
    } else {
      toast.error("No file chosen");
    }
  }; 
  useEffect(() => {
   
    fetchData();
    fetchSlotsData();
  }, [user, uploadUserImage]);
  return (
    <div className="cl container">
      <div className="container text-center p-3 my-3 cl2">
        <div className="row">
          <div className="col-sm p-4">
            <div className="container ">
              <img
                className="custom-image border border-primary rounded"
                height="300"
                width="300"
                src={image ? image : profileDummy}
              />
            </div>
            <div className="container">
              {user && email && user.email == email && (
                <>
                  <input
                    type="file"
                    className="form-control m-2"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button onClick={upload_Image} className="btn btn-primary">
                    Update image
                  </button>
                </>
              )}
            </div>
          </div>
          {user_det && (
            <div className="col-sm">
              <div className="container p-2 ">
                <p className="text text-center fs-1 fw-bolder text-primary">
                  {user_det.name}
                </p>
                <p className="text text-center fs-2 fw-bold text-primary">
                  {user_det.email}
                </p>
                <p className="text text-center fs-2 fw-bold text-primary">
                  {user_det.enrollment}
                </p>
                <p className="text text-center fs-2 fw-bold text-primary">
                  Branch- {user_det.branch.toUpperCase()}
                </p>

                <p className="text text-center fs-2 fw-bold text-primary">
                 Slot- {(user_det.slot!=null) ? user_det.slot : "Nil"}
                </p>
              </div>

              <div className="dropDiv">         
              <button className="btni" id="btn" onClick={()=> setShowDropdown(!showDropdowm)}>
                Update Slot
                <i className={`bx bx-chevron-down ${showDropdowm?"arrow":""}`} id="arrow"></i>
              </button>
              <div className={`dropdown ${showDropdowm?"show ":""}`} id="dropdown">
              {slots&&<>
                  {slots.map(slot=>{
               
                
                
                    if(slot.name!=user_det.slot&&Number(slot.totalSeats)-Number(slot.filledSeats)>0){
                      
                        return <p className="text text-center fw-bold btn" onClick={()=>{
                            
                             setUserSlot(slot.name)
                             setShowDropdown(!showDropdowm)
                             updateSlot()
                        }}>{slot.name}</p>
                            
                    }
                  
                  })}
                  <p className="text text-center fw-bold btn" onClick={()=>{
                    
                    setUserSlot('null')
                    setShowDropdown(!showDropdowm)
                    updateSlot()
                    }}>No slot</p>
                </>}
              </div>
              </div>  
             {user&&slots&&image?<>
              <p className="text my-2 fs-4 fw-bold">Gym Access Cerificate</p>
              <PDFViewer>
                <PdfFile name={user.name} email= {user.email} enrollment={user.enrollment} slotName={user.slot}  branch ={user.branch} slot={slots.find(element => element["name"] === user.slot)?slots.find(element => element["name"] === user.slot):null} image={image}/>
              </PDFViewer></>:<>{!image&&"Upload image to get certificate"}</>}
            
            
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default StudentDetails;
