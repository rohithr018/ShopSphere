import axios from "axios"
const BASE_URL = "http://localhost:5000/api/";

// const [token ,setToken]=useState()
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjVmZTQ0ZjMwNjE3YzViNzQyMzM4OSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjMyMDMxODMsImV4cCI6MTcyMzIwMzI0M30.osDMrqj7WeoH-mluxAmxElcn61KsU9rK6M6EIZorZDU";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})