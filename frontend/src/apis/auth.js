import axios from 'axios'
const BACKEND_URL="http://localhost:8000"

export const userLogin= async(code)=>{
    const url= BACKEND_URL + "/auth/login/user"
    const res= await axios.post(url,{
        code: code
    })
    return res.data;
}

export const adminLogin= async(username, password)=>{
    const url= BACKEND_URL+"/auth/login/admin";
    const res= await axios.post(url,{
        username: username, 
        password: password
    })

    return res.data
}