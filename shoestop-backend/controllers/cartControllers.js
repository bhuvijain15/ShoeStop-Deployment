
const cart = require("../modal/cartSchema");

const addcarts = async (req, res) => {
    try {
        const { title, image, company, price } = req.body;
        const userId = req.user.id;

        const existingProduct = await cart.findOne({
            title: title,
            user: userId
        });

        if (existingProduct) {
            return res.status(202).json({
                result: "already in cart list"
            });
        }

        const cartProduct = await cart.create({
            title,
            image,
            company,
            price,
            quantity: 1,
            user: userId
        });

        res.status(201).json({
            message: "Product added to cart",
            cart: cartProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to add product to cart" });
    }
};

const getAllcartProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const allcartProducts = await cart.find({
            user: userId
        });

        res.json(allcartProducts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch cart products" });
    }
};

const removeFromcart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartID = req.params.id;

        const deletecart = await cart.findOneAndDelete({
            _id: cartID,
            user: userId
        });

        if (!deletecart) {
            return res.status(404).json({
                message: "Cart product not found"
            });
        }

        res.json(deletecart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to remove cart product" });
    }
};

module.exports = {
    addcarts,
    getAllcartProducts,
    removeFromcart
};
