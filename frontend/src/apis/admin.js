import axios from 'axios'
const BACKEND_URL="https://centralgymregistration.yash.mdgspace.org:8000/backend"

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

export const editSlot= async(token, preName,newName, start_time, end_time, totalSeats)=>{
    
    const url=  BACKEND_URL+'/admin/editSlot/'+preName;
    const res= await axios.put(url,{
        name: newName,
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


export const openSlotOption = async(token)=>{
    const url = BACKEND_URL+"/admin/openSlotSlection"
    const res = await axios.put(url ,{},{headers:{Authorization:`Bearer ${token}`}})
    return res.data
}