import {
    CalendarTodayRounded,
    LocationSearchingRounded,
    MailRounded,
    PermIdentityRounded,
    PhoneAndroidRounded,
    PublishRounded
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import "./User.css"

export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit user</h1>
                <Link to={"/newuser"}>
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">Anna Becker</span>
                            <span className="userShowUserTitle">Software Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>

                        <div className="userShowInfo">
                            <PermIdentityRounded className="userShowIcon" />
                            <span className="userShowInfoTitle"> annabeck99</span>
                        </div>

                        <div className="userShowInfo">
                            <CalendarTodayRounded className="userShowIcon" />
                            <span className="userShowInfoTitle"> 10/08/2004</span>
                        </div>

                        <span className="userShowTitle">Contact Details</span>

                        <div className="userShowInfo">
                            <PhoneAndroidRounded className="userShowIcon" />
                            <span className="userShowInfoTitle"> 123456789</span>
                        </div>

                        <div className="userShowInfo">
                            <MailRounded className="userShowIcon" />
                            <span className="userShowInfoTitle"> anna@email.com</span>
                        </div>

                        <div className="userShowInfo">
                            <LocationSearchingRounded className="userShowIcon" />
                            <span className="userShowInfoTitle"> address</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>UserName</label>
                                <input
                                    type="text"
                                    placeholder="annabeck99"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Anna Becker"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="anna@email.com"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="123456789"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    src="https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg"
                                    alt=""
                                    className="userUpdateImg"
                                />
                                <label htmlFor="file">
                                    <PublishRounded className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
