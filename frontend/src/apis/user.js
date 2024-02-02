import axios from 'axios'

const BACKEND_URL="http://localhost:8000"

export const  getUser = async(token, email) => {
    const url = BACKEND_URL+"/user/getUser?email="+email
    const res= await axios.get(url,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data;
}

export const changeUserSlot= async(token, slot)=>{
    const url = BACKEND_URL+"/user/changeSlot?slot="+slot;
    const res= await axios.put(url,{},{
        
            "Authorization": `Bearer ${token}`
        
    })
    return res.data;
}

export const uploadUserImage= async(token, file)=>{
    const url= BACKEND_URL+'/user/uploadImage';
    const formData = new FormData();
    formData.append("file", file)
    const res= await axios.put(url,formData, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data;
}

export const getUserImage = async(token, email)=>{
    const url= BACKEND_URL+"/user/image?email="+email;
    const res = await axios.get(url, {
        responseType: 'blob',

        headers:{
            "Authorization": `Bearer ${token}`,
            Accept: '*/*',

        }
    }) 

    return res.data;
}

export const getAllSlots= async(token)=>{
    const  url = BACKEND_URL + "/user/allSlots";
    const res= await axios.get(url ,{
        headers:{"Authorization" : `Bearer ${token}`},
    });
    
    return res.data;
}