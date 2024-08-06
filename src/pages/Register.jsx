import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { mobile } from "../responsive";

const Container = styled.div`
    width:100vw;
    height:100vh;
    background:linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),
    url(https://cdn.shopify.com/s/files/1/0070/7032/files/Header_43a6fbaa-305a-4bda-8ef7-5e7f4e1278da.png?v=1694450194) center;
    display:flex;
    align-items:center;
    justify-content:center;  
    background-size:cover; 
`;

const Wrapper = styled.div`
    padding:20px;
    width:40%;
    background-color:#fff;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size:24px;
    font-weight:300;
`;

const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`;

const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`;
const AgreementContainer = styled.label`
    display: flex;
    align-items: center;
    font-size: 12px;
`;

const Agreement = styled.label`
    font-size:12px;
    margin:15px 0px ;
`;

const Button = styled.button`
    width:40%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:#fff;
    cursor:pointer;
    margin:5px 0px;
    &:disabled {
        color:#000;
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
    font-size:15px;
    font-weight:500;
    color:red;
    margin:5px;
`;
const Register = () => {
    const [username, setusername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", {
                username,
                email,
                password,
                confirmpassword: confirmPassword,
            });
            setMessage(response.data.message);
            if (response.status === 201) {
                alert(response.data.message + "\nLogin with Your Credentials")
                navigate("/");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "An error occurred");
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>Create an account</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => { setusername(e.target.value) }} />
                    <Input placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <Input placeholder="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <Input placeholder="confirm password" type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    {message && <Error >{message}</Error>}
                    <AgreementContainer >

                        <input
                            type="checkbox"
                            style={{ margin: '0 10px 0 0' }}
                            checked={isChecked}
                            onClick={(e) => setIsChecked(!isChecked)}
                        />
                        <Agreement>
                            By Creating an account,I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                    </AgreementContainer>

                    <Button onClick={handleSubmit} disabled={!isChecked}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
