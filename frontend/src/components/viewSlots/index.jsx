import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/user/userContext";
import adminContext from "../../context/admin/adminContext";
import { getAllSlots } from "../../apis/user";
import { addSlot, getAdminAllSlots } from "../../apis/admin";
import {Link} from 'react-router-dom'
import Slot from "./components/Slot";
import toast from 'react-hot-toast'

const ViewSlot = () => {

  const { admin, setAdmin } = useContext(adminContext);
  const { user, setUser } = useContext(userContext);
  const token = localStorage.getItem("token");
  const [slots, setSlots] = useState(null);
  const [name, setName] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalSeats, setTotalSeats] = useState(null);
  const [selectedSlot, setSelectedSlot]= useState(0)
  const fetchData = async () => {
    if (token) {
      console.log(admin)
      try {
        if (user) {
          const res = await getAllSlots(token);
         
          setSlots(res.slots);
        } else if (admin) {
          const res = await getAdminAllSlots(token);
          console.log(res.slots)
          setSlots(res.slots);
        }
      } catch (e) {}
    }
  };

  const AddHandler= async()=>{
    if(token&&admin&&name&&startTime&&endTime&&totalSeats&&slots){
      const func= async()=>{
        const res= await addSlot(token, name, startTime, endTime, totalSeats)
      const obj={
        name: name,
        start_time: startTime,
        end_time: endTime,
        totalSeats: totalSeats,
        filledSeats: 0
      }
    
      setSlots(pslots=>[...pslots,obj])
      setName(null)
      setStartTime(null)
      setEndTime(null)
      setTotalSeats(null)
      }

      toast.promise(func(), {
        loading: "Adding slot",
        success: <b>Slot Added</b>,
        error: <b>Error occured</b>,
      });


    }else{
       
       toast.error("Invalid inputs")
    }
  }

  useEffect(() => {
 
    fetchData();
  }, [ admin, user,setAdmin,setUser, setSelectedSlot]);

  return (
    <div>
      <div className="container">
        <div className="row">
      
          {
          slots &&
            slots.map((slot, index) => {
          
              return    <Slot
                user={user ? "user" : "admin"}
                slot={slot}
                slots={slots}
                setSlots={setSlots}
                index={index}
                setSelectedSlot={setSelectedSlot}
              />;
            })}
        </div>
        {admin&&<div className="container">
        <button
                type="button"
                className="btn btn-primary m-3"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
              >
                Add Slot
              </button>
        </div>}
      </div>
      <div className="container">
        <p className="text text-center fs-2">User's</p>
        <div className="container d-flex align-items-center">
         
          {slots&&slots.length>0&&(slots[selectedSlot]!=undefined)&&(slots[selectedSlot].users!=undefined)&&slots[selectedSlot].users.map(user=>{
            return <Link className="mx-auto text text-center fs-3" to={"/studentDetails/"+user.email}>{user.email}</Link>
          })} 

        </div>
      </div>
      <div
        className="modal fade"
        id="addModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-2">
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setName(e.target.value)}
                  value={name?name:""}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Start Time
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={startTime?startTime:""}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  End Time
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={endTime?endTime:""}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Total Seats
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={totalSeats?totalSeats:0}
                  onChange={(e) => setTotalSeats(Number(e.target.value))}
                />
              </div>
            </form>

            {<div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={AddHandler}
              >
                Save changes
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSlot;
