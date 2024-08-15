const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Order = require("../models/Order");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//create

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)

    } catch (err) {
        return res.status(500).json(err);
    }

})

// update
router.put("/:id", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedOrder)
        } catch (err) {
            return res.status(500).json(err);
        }
    });

//Delete
router.delete("/:id", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Order has been deleted" })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get user orders
router.get("/find/:userid", verifyTokenAndAuthorization,
    async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId });

            return res.status(200).json(orders)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get All 

router.get("/", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const orders = await Order.find()
            return res.status(200).json(orders)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
);

//get monthly income
router.get("/income", verifyTokenAndAdmin,
    async (req, res) => {
        const productId = req.query.pid;
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
        try {
            const income = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                        ...(productId && {
                            products: { $elemMatch: { productId } },
                        })
                    }
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount"
                    },
                },

                {
                    $group: {
                        _id: "$month",//(eg.8 for august)
                        total: { $sum: "$sales" },
                    },
                },
            ])
            return res.status(200).json(income)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

module.exports = router;