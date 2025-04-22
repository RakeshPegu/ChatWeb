import axios from 'axios'
export const apiRequest = new axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})