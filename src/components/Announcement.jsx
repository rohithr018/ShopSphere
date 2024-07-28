import { styled } from "styled-components"

const Container = styled.div`
    height:30px;
    background-color:teal;
    color:white;
    display:flex;
    justify-content:center;
    font-size:14px;
    font-weight:500;
`
const Announcement = () => {
    return (
        <Container>
            ENTER TEXT
            Announcement.js
        </Container>
    );
};

export default Announcement
