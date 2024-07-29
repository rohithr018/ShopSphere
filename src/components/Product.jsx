import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components"

const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgb(0,0,0,0.2);
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:all 0.5s ease;
    cursor:pointer;
    
`;
const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#f3fafa;
    position:relative;
    &:hover ${Info}{
        opacity:1;
    }
`;

const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:#fff;
    position:absolute;

`;
const Image = styled.img`
    height:75%;
    z-index:2;
`;


const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
    transition: all 0.5s ease;
    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.1);
    }


`;

const Product = ({ item }) => {
    const handleImageError = (event) => {
        event.target.src = "https://img.freepik.com/free-vector/crossing-bones-skull-vector-logo_43623-1281.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=sph";
    };
    return (
        <Container>
            <Circle />
            <Image src={item.img} onError={handleImageError} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <SearchOutlined />
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
