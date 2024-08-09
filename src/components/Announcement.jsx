import { styled } from "styled-components"
import { mobile } from "../responsive";

const Container = styled.div`
    height:35px;
    background-color:teal;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:20px;
    font-weight:500;
    ${mobile({ fontSize: "15px" })}
`
const Announcement = () => {
    const announcement = "Super Deal! Free Shipping on Orders Over $499"
    return (
        <Container>{announcement}</Container>
    );
};

export default Announcement
