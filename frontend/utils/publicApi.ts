import axios from "axios";

const publicApi =  axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials:true
})

export default publicApi;