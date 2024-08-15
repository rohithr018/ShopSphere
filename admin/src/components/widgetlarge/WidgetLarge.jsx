import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./WidgetLarge.css"
import { format } from "timeago.js";
export default function WidgetLarge() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getorders = async () => {
            try {

                const res = await userRequest.get("orders")
                setOrders(res.data)
            } catch (err) { }
        };
        getorders()
    }, []);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className="widgetLg">
            <span className="widgetLgTitle">latestTransaction</span>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                {orders.map((order) => (
                    <tr className="widgetLgTr" key={order._id}>
                        <td className="widgetLgUser">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg" alt="" className="widgetLgImg" />
                            <span className="widgetLgName">{order.userId}</span>
                        </td>
                        <td className="widgetLgDate">{format(order.createdAt)}</td>
                        <td className="swidgetLgAmount">{order.amount}</td>
                        <td className="widgetLgStatus"><Button type={order.status} /></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
