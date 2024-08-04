import axios from "axios"

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWJiMGQzNTQwZGY2Y2QzYWNkNTA3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMjc2NDU1NiwiZXhwIjoxNzIzMDIzNzU2fQ.mN6SKbe7PXb0x21JxzUYmIBP1F6Qzadchr0-I-hlTnA";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})