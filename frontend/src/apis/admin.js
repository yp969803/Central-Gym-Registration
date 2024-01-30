import axios from 'axios'
const BACKEND_URL="localhost:8000"

export const getAdmin= async(token)=>{
    const url = BACKEND_URL+"/admin/getAdmin"
    const res= await axios.get(url,{
        headers:{Authorization:`Bearer ${token}`}
    })
    return res.data;
}

export const addSlot= async(token, name, start_time, end_time, totalSeats)=>{
    
    const url=  BACKEND_URL+'/admin/addSlot';
    const res= await axios.post(url,{
        name:name,
        start_time:start_time,
        end_time:end_time,
        totalSeats:totalSeats
    }, {headers:{Authorization:`Bearer ${token}`}})

     return res.data
}

export const editSlot= async(token, name, start_time, end_time, totalSeats)=>{
    
    const url=  BACKEND_URL+'/admin/editSlot/'+name;
    const res= await axios.post(url,{
        
        start_time:start_time,
        end_time:end_time,
        totalSeats:totalSeats
    }, {headers:{Authorization:`Bearer ${token}`}})

     return res.data
}

export const deleteSlot = async(token,  slotName) => {
    const url= BACKEND_URL+"/admin/delete/"+slotName
    const res= await axios.delete(url,{
        headers:{Authorization:`Bearer ${token}`}
    })

    return res.data
}

export const getAdminAllSlots= async(token)=>{
    const url = BACKEND_URL+"/admin/allSlots"
    const res = await axios.get(url,{
        headers :{ Authorization:`Bearer ${token}` }
    })
    return res.data;
}