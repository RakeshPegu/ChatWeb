import axios from "axios";
export const apiRequest = axios.create({
    baseURL:import.meta.env.BASE_URL,
    withCredentials:true

})