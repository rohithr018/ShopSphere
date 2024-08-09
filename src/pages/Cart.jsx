import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
//const KEY = process.env.PUBLISHABLE_STRIPE_KEY;
const KEY = "pk_test_51PjMUo08qkAj1KM3rU9Bsyf39GqkYGTU8UjVyEBm5XEN6Szj7o4b2l1aZmCf2K2GA89DZjkpb87wnhB5mhJBzNiU00lqEHWWAw";

const Container = styled.div``;

const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px", margin: "0px 5px" })}
`;

const Title = styled.h1`
    font-weight:300;
    text-align:center;
`;

const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border-radius: 10px;
    border:${(props) => props.type === "filled" && "none"};
    background-color:${(props) => props.type === "filled" ? "black" : "transparent"};
    color:${(props) => props.type === "filled" && "White"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
    flex:3;
`;

const Product = styled.div`
    display:flex;
    justify-content:space-between; 
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex:2;
    display:flex;
`;

const Image = styled.img`
    width:200px;
`;

const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
`;

const ProductSize = styled.span``;

const PrizeDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;

const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color:#060606;
    border:none;
    height:1px;
`;

const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`;

const SummaryTitle = styled.h1`
    font-weight:200;
`;

const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${(props) => props.type === "total" && "500"};
    font-size:${(props) => props.type === "total" && "24px"};

`;

const SummarItemText = styled.span``;

const SummarItemPrice = styled.span``;

const Button = styled.button`
    width:100%;
    padding:10px;
    background:black;
    border-radius: 10px;
    color:white;
    font-weight:600;
    &:hover {
        background-color: #333131;
    }
`;


const Cart = () => {
    const cart = useSelector(state => state.cart)
    const estshipping = cart.total > 499 ? 0 : 10;
    const discount = 10;//percent
    const Total = cart.total + estshipping - (discount / 100) * cart.total //grosstotal
    const finalTotal = Math.round(Total) //finaltotal
    const rounding = (Total - finalTotal).toFixed(2)//finaltotal

    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    const handlecontinue = () => {
        navigate("/")
    }
    const onToken = (token) => {
        setStripeToken(token)
        console.log(stripeToken)
    }

    //console.log("Stripe Publishable Key:", KEY);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success", {
                    stripeData: res.data
                })
            } catch (err) {
                console.log(err)
            }
        }
        stripeToken && cart.total > 0 && makeRequest()
    }, [stripeToken, cart.total, navigate])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>BAG</Title>
                <Top>
                    <TopButton onClick={handlecontinue}>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping bag(2)</TopText>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => (

                            <Product key={product.id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductId><b>ID:</b>{product.id}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size:</b>{product.color}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PrizeDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>{product.price * product.quantity}</ProductPrice>
                                </PrizeDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>OrderSummar</SummaryTitle>
                        <SummaryItem>
                            <SummarItemText>SubTotal</SummarItemText>
                            <SummarItemPrice>${cart.total}</SummarItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummarItemText>Discount</SummarItemText>
                            <SummarItemPrice>-{discount}%</SummarItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummarItemText>EstimatedShipping</SummarItemText>
                            <SummarItemPrice>+${estshipping}</SummarItemPrice>
                        </SummaryItem>
                        <SummaryItem >
                            <SummarItemText>Rounding</SummarItemText>
                            {rounding > 0
                                ? <SummarItemPrice>-${rounding}</SummarItemPrice>
                                : <SummarItemPrice>+${-rounding}</SummarItemPrice>
                            }
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummarItemText>Total</SummarItemText>
                            <SummarItemPrice>${finalTotal}</SummarItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Total = ${finalTotal}`}
                            amount={finalTotal * 100} //as stripe works on cents
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>

            <Footer />
        </Container>
    )
}

export default Cart
