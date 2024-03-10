import React, { useEffect, useState } from "react";
import { deleteSlot, editSlot } from "../../../apis/admin";
import toast from 'react-hot-toast'

const Slot = ({ user, slot, slots, setSlots , index, setSelectedSlot}) => {

  const [name, setName] = useState(slot ? slot.name : "");
  const [startTime, setStartTime] = useState(slot ? slot.start_time : "");
  const [endTime, setEndTime] = useState(slot ? slot.end_time : "");
  const [totalSeats, setTotalSeats] = useState(slot ? slot.totalSeats : 0);
  const token = localStorage.getItem("token");
  const EditHandler = async () => {
    if (token && user && user === "admin" && slots&&slot) {
      const func = async () => {
        const res = await editSlot(
          token,
          slot.name,
          name,
          startTime,
          endTime,
          Number(totalSeats)
        );
        const tempSlots = slots.map((e) => {
          if (e.name == slot.name) {
            e.name = name
             e.start_time = startTime;
            e.end_time = endTime;
            e.totalSeats = Number(totalSeats);
          }
          return e;
        });
        setSlots(tempSlots);
      };
      toast.promise(func(), {
        loading: "Updating slot",
        success: <b>Slot Updated</b>,
        error: <b>Error occured</b>,
      });
    }
  };


  const DeleteHandler= async()=>{
    if(token&&user&&slots&&slot&&user=="admin"){
        const func= async()=>{
            const res= await deleteSlot(token, slot.name)
            const tempSlots = slots.map((e) => {
                if (e.name == slot.name) {
                 return;
                }
                return e;
              });
              setSlots(tempSlots);
        }
        toast.promise(func(), {
            loading: "Deleting slot",
            success: <b>Slot Deleted</b>,
            error: <b>Error occured</b>,
          });

    }
  }
  return (
   <>{slot&&
    <div className="col-sm btn" onClick={()=>setSelectedSlot(index)}>
      <div className="card text-center">
        <div className="card-header">Slots</div>
        <div className="card-body">
          <h5 className="card-title">{slot.name?slot.name:""}</h5>
          <p className="card-text ">
            <p>
              {" "}
              <span className="fw-bold">Start-time :</span>{" "}
              <span className="text text-success fw-bold">
                {slot.start_time?slot.start_time:""}
              </span>
            </p>
            <p>
              <span className="fw-bold">End-time :</span>{" "}
              <span className="text text-success fw-bold">{slot.end_time?slot.end_time:""}</span>
            </p>

            <p>
              <span className="fw-bold">Total Seats :</span>{" "}
              <span className="text text-success fw-bold">
                {slot.totalSeats?slot.totalSeats:""}
              </span>
            </p>
            <p>
              <span className="fw-bold">Seats Occupied :</span>{" "}
              <span className="text text-success fw-bold">
                {slot.filledSeats?slot.filledSeats:""}
              </span>
            </p>
          </p>

          {user=="admin"&&
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#${slot.name?slot.name:"id"}`}
              >
                Edit
              </button>
              <button onClick={DeleteHandler} className="btn btn-primary mx-2" data-mdb-ripple-init >
                Delete
              </button>
            </div>
          }
        </div>
      </div>
      <div
        className="modal fade"
        id={`${slot.name?slot.name:"id"}`}
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
                  value={name}
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
                  value={startTime}
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
                  value={endTime}
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
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(Number(e.target.value))}
                />
              </div>
            </form>

            {user&&user=="admin"&&<div className="modal-footer">
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
                onClick={EditHandler}
              >
                Save changes
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Slot;
