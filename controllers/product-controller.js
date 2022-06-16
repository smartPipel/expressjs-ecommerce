const { Product } = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    return res.json(products);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const searchProduct = async (req, res) => {
  try {
    const product = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const rateProduct = async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();

    return res.json(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const dealOfTheDay = async (req, res) => {
  try {
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let sumA = 0;
      let sumB = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        sumA += a.ratings[i].rating;
      }

      for (let j = 0; j < a.ratings.length; j++) {
        sumB = a.ratings[j].rating;
      }

      return sumA < sumB ? 1 : -1;
    });

    res.json(products);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { getProducts, searchProduct, rateProduct, dealOfTheDay };
