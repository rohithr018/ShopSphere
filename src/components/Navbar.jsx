import { AccountCircle, Search } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    border-radius: 25px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const LogoImage = styled.img`
    height: 45px;
    object-fit: cover;
    ${mobile({ height: '30px' })}
`;

const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: "2" })}
`;

const MenuItem = styled.div`
    font-size: 15px;
    cursor: pointer;
    margin-left: 20px;
    padding:5px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const AccountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    border-radius: 5px;
    padding:5px;
    position: relative; 
    cursor: pointer;
    ${mobile({ marginLeft: "10px" })}
    &:hover {
        background-color: #f0f0f0;
    }
`;

const AccountName = styled.span`
    font-size: 15px;
    margin-left: 10px;
    ${mobile({ fontSize: "12px" })}
`;

const Dropdown = styled.div`
    display: ${props => (props.open ? 'block' : 'none')};
    position: absolute;
    top: 120%;
    right: 0;
    background-color: white;
    border: 1.5px solid lightgray;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    padding: 5px;
    z-index: 1;
    width: 75px;
    max-height: 80px; /* Add a max height */
    overflow-y: auto; /* Scroll if content overflows */
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid lightgray; /* Add a separator line */
    &:hover {
        background-color: #f0f0f0;
    }
    &:last-child {
        border-bottom: none; /* Remove bottom border from the last item */
    }
`;

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        logout(dispatch);
        navigate('/');
        window.location.reload();
    };
    const handleProfile = () => {
        navigate('/profile');
    };

    const handleMenu = (type) => () => {
        if (type === "register") {
            navigate('/register');
        } else if (type === "login") {
            navigate("/login");
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>En</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <LogoContainer onClick={handleClick}>
                        <LogoImage src="/images/icon2.png" alt="ShopSphere Logo" />
                        <Logo>ShopSphere</Logo>
                    </LogoContainer>
                </Center>
                <Right>
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="secondary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                    {user ? (
                        <>
                            <AccountContainer onClick={toggleDropdown} >
                                <AccountCircle />
                                <AccountName>{user.username}</AccountName>
                                <Dropdown ref={dropdownRef} open={dropdownOpen}>
                                    <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </Dropdown>
                            </AccountContainer>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={handleMenu("register")}>Register</MenuItem>
                            <MenuItem onClick={handleMenu("login")}>LogIN</MenuItem>
                        </>
                    )}

                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
