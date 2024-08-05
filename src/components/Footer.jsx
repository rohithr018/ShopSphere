import {
    Email,
    GitHub,
    Instagram,
    LinkedIn,
    Mail,
    Phone,
    Room,
} from "@mui/icons-material";
import { styled } from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display:flex;
    ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`;

const Logo = styled.h1``;


const Desc = styled.p`
    margin:20px 0px;

`;

const SocialContainer = styled.div`
    display:flex;
`;

const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:#fff;
    background-color:#${(props) => props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;

const Center = styled.div`
    flex:1;
    padding:20px;
    ${mobile({ display: "none" })}
`;

const Title = styled.h3`
    margin-bottom:30px;
`;

const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`;

const ListItem = styled.li`
    width:50%;
    margin-bottom:10px;
`;

const Right = styled.div`
    flex:1;
    padding:20px;
    ${mobile({ backgroundColor: "#bab4b4" })}
`;

const ContactItem = styled.div`
    margin-bottom:20px;
    display:flex;
    align-item:center;
`;
const Payment = styled.img`
    width:50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Rohith</Logo>
                <Desc>E-Commerce with MERN stack</Desc>
                <SocialContainer>
                    <a
                        href="https://www.linkedin.com/in/rohithr1809/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SocialIcon color="0000FF">
                            <LinkedIn />
                        </SocialIcon>
                    </a>
                    <a
                        href="https://www.instagram.com/__rohith18/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SocialIcon color="E4405F">
                            <Instagram />
                        </SocialIcon>
                    </a>
                    <a
                        href="https://github.com/rohithr018"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SocialIcon color="000000">
                            <GitHub />
                        </SocialIcon>
                    </a>
                    <a
                        href="mailto:rohith018.r@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <SocialIcon color="000000">
                            <Email />
                        </SocialIcon>
                    </a>
                </SocialContainer>
            </Left>
            <Center>
                <Title>
                    UsefulLinks
                </Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Mens Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} />Bengaluru
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} />{process.env.MOBILE}
                </ContactItem>
                <ContactItem>
                    <Mail style={{ marginRight: "10px" }} />{process.env.EMAIL}
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>

        </Container>
    )
}

export default Footer
