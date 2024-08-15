import axios from "axios"
const BASE_URL = "http://localhost:5000/api/";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWJiMGQzNTQwZGY2Y2QzYWNkNTA3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMzc0MjY1NSwiZXhwIjoxNzIzODI5MDU1fQ.lj2OXf5J6AWv4Ys8Gj2Vp8vdUQdmvsZDrBJSXi7JkDM"

//console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
})