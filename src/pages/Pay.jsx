import axios from "axios";
import { useEffect, useState, useHistory } from "react";
import StripeCheckout from "react-stripe-checkout";

const KEY = "pk_test_51PjMUo08qkAj1KM37hAja3xfDYCrN7etiHo04kvptvzKVwGREzeWRhv0cPqZsJKj16HGquLBqtHdXcrLPOUordwl00g5RUmmTa"
const Pay = () => {
    const { stripeToken, setStripeToken } = useState(null);
    const history = useHistory()
    const onToken = (token) => {
        setStripeToken(token);
    }
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:500/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                )
                console.log(res.data);
                history.push("/success");
            } catch (err) {
                console.log(err)
            }
        };
        stripeToken && makeRequest()
    }, [stripeToken, history]);
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout
                name="Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description="Total = $20"
                amount={2000} //as stripe works on cents
                token={onToken}
                stripeKey={KEY}
            >

                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Pay Now
                </button>
            </StripeCheckout>

        </div>
    );
};

export default Pay
