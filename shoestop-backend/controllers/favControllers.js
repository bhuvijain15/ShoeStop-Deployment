
const fav = require('../modal/fav');

const addFavs = async (req, res) => {
    try {
        const { title, image, company, price } = req.body;
        const userId = req.user.id;

        const existingProduct = await fav.findOne({
            title: title,
            user: userId
        });

        if (existingProduct) {
            return res.status(202).json({
                result: "already in fav list"
            });
        }

        const favProduct = await fav.create({
            title,
            image,
            company,
            price,
            user: userId
        });

        res.status(201).json({
            message: 'Product added to favorites',
            fav: favProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unable to add product to favorites"
        });
    }
};

const getAllfavProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const allfavProducts = await fav.find({
            user: userId
        });

        res.json(allfavProducts);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unable to fetch favorite products"
        });
    }
};

const removeFromFav = async (req, res) => {
    try {
        const userId = req.user.id;
        const favID = req.params.id;

        const deleteFav = await fav.findOneAndDelete({
            _id: favID,
            user: userId
        });

        if (!deleteFav) {
            return res.status(404).json({
                message: "Favorite product not found"
            });
        }

        res.json(deleteFav);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unable to remove favorite product"
        });
    }
};

module.exports = {
    addFavs,
    getAllfavProducts,
    removeFromFav
};
