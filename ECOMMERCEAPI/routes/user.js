const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const { json } = require("react-router-dom");

router.post("/register", async (req, res) => {
    const { username, password, email, confirmpassword } = req.body;

    // Check for missing fields
    if (!username || !password || !email || !confirmpassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }

    try {
        // Check for existing user
        const duplicateUser = await User.findOne({ username }).exec();
        if (duplicateUser) {
            return res.status(409).json({ message: "Username already taken!" });
        }

        // Check for existing email
        const duplicateEmail = await User.findOne({ email }).exec();
        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash password and create user
        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user
        await newUser.save();

        return res.status(201).json({ message: `User ${username} created successfully!` });

    } catch (err) {
        console.error("Error creating user:", err); // Log the error for debugging
        return res.status(500).json({ message: "Error creating user", error: err.message });
    }
});


//update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization,
    async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "User has been deleted" })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get
router.get("/find/:id", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const { password, ...others } = user._doc;

            return res.status(200).json(others)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get All Users
router.get("/", verifyTokenAndAdmin,
    async (req, res) => {
        const query = req.query.new
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            // const { password, ...others } = user._doc;

            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
);

//get user stats
router.get("/stats", verifyTokenAndAdmin,
    async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                    }
                },
                {
                    $group: {
                        _id: "$month",//(eg.8 for august)
                        total: { $sum: 1 },
                    }
                }
            ])
            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
);





module.exports = router;