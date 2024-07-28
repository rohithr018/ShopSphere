import { Search } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const Container = styled.div`
    height:60px;
`
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    /* width:33.3%; */
`
const Language = styled.span`
    font-size:14px;
    cursor:pointer;
`
const SearchContainer = styled.span`
    border:0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
    border-radius:25px;

`
const Input = styled.input`
    border:none;
`

const Center = styled.div`
    /* width:33.3%; */
    flex:1;
    text-align:center;
    display:flex;
`

const Logo = styled.h1`
    font-weight:bold;
    
`
const Right = styled.div`
    /* width:33.3%; */
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;


`

const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
`
const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>En</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "black", fontSize: 25 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>Logo</Logo>
                </Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Sign IN</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar
