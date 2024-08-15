import { Visibility } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethods"
import "./WidgetSmall.css"

export default function WidgetSmall() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getusers = async () => {
            try {

                const res = await userRequest.get("users/?new=true")
                setUsers(res.data)
            } catch (err) { }
        };
        getusers()
    }, [])
    //console.log(users)
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map(user => (
                    <li className="widgetSmListitem" key={user._id}>
                        <img
                            src={
                                user.img || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                            }
                            alt=""
                            className="widgetSmImg" />
                        <div className="widgetSmuser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
