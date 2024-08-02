const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
//register

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const duplicateUser = await User.findOne({ username }).lean().exec()
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" })
    }
    if (duplicateUser) {
        return res.status(409).json({ message: "Duplicate User" })
    }
    if (duplicateEmail) {
        return res.status(409).json({ message: "Duplicate Email" })
    }

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res) => {
    // const { username, password } = req.body;
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "All fields required" })
    }
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "Wrong Username!" })
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        if (hashedPassword !== req.body.password) {

            return res.status(400).json({ message: "Wrong Password!" });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {
                expiresIn: "3d"
            }
        );

        const { password, ...others } = user._doc;


        return res.status(200).json({ ...others, accessToken });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

module.exports = router;