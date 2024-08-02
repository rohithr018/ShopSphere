const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//create

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)

    } catch (err) {
        return res.status(500).json(err);
    }

})

// update
router.put("/:id", verifyTokenAndAuthorization,
    async (req, res) => {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedCart)
        } catch (err) {
            return res.status(500).json(err);
        }
    });

//Delete
router.delete("/:id", verifyTokenAndAuthorization,
    async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Cart has been deleted" })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get user cart
router.get("/find/:userid", verifyTokenAndAuthorization,
    async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });

            return res.status(200).json(cart)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get All 

router.get("/", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const carts = await Cart.find()
            return res.status(200).json(carts)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
);

module.exports = router;