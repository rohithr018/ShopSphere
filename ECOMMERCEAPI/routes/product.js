const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)

    } catch (err) {
        return res.status(500).json(err);
    }

})

//update
router.put("/:id", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedProduct)
        } catch (err) {
            return res.status(500).json(err);
        }
    });

//Delete
router.delete("/:id", verifyTokenAndAdmin,
    async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Product has been deleted" })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get
router.get("/find/:id",
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)

            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
)

//Get All Products
router.get("/",
    async (req, res) => {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try {
            let products;
            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5)
            } else if (qCategory) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    }
                });
            } else {
                products = await Product.find();
            }

            return res.status(200).json(products)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
);

module.exports = router;