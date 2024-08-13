import "./NewUser.css"

export default function NewUser() {
    return (
        <div className="newuser">
            <h1 className="newuserTitle">newUser</h1>
            <form className="newuserForm">
                <div className="newuserItem">
                    <label>User Name </label>
                    <input type="text" placeholder="john" />
                </div>
                <div className="newuserItem">
                    <label>Full Name</label>
                    <input type="text" placeholder="john Doe" />
                </div>
                <div className="newuserItem">
                    <label>Email</label>
                    <input type="text" placeholder="john@doe.com" />
                </div>
                <div className="newuserItem">
                    <label>Password</label>
                    <input type="text" placeholder="password" />
                </div>
                <div className="newuserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="123456789" />
                </div>
                <div className="newuserItem">
                    <label>Address</label>
                    <input type="text" placeholder="New York" />
                </div>
                <div className="newuserItem">
                    <label>Gender</label>
                    <div className="newuserGender">
                        <input type="radio" name="gender" id="male" value="male" />
                        <label For="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female" />
                        <label For="female">Female</label>
                    </div>
                </div>
                <div className="newuserItem">
                    <label >Active</label>
                    <select name="active" id="active" className="newuserSelect">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button className="newuserCreateButton">Update</button>
            </form>

        </div>
    )
}
