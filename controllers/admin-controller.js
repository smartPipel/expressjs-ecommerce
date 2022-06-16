const Order = require("../models/order");
const { Product } = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, description, image, quantity, price, category } = req.body;

    let product = new Product({
      name,
      description,
      image,
      quantity,
      price,
      category,
    });

    product = await product.save();

    return res.json(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});

    return res.json(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);

    return res.json(product);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.json(orders);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    let order = await Order.findById(id);
    order.status = status;
    order = await order.save();

    return res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const analystics = async (req, res) => {
  try {
    const orders = await Order.find({});

    let totalEarnings = 0;

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        totalEarnings +=
          orders[i].products.quantity * orders[i].products.product.price;
      }
    }

    let mobileEarnings = fetchCategoryWiseProduct("Mobiles");
    let essentialEarnings = fetchCategoryWiseProduct("Essentials");
    let applianceEarnings = fetchCategoryWiseProduct("Appliances");
    let booksEarnings = fetchCategoryWiseProduct("Books");
    let fashonEarnings = fetchCategoryWiseProduct("Fashion");

    let earnings = {
      mobileEarnings,
      essentialEarnings,
      applianceEarnings,
      booksEarnings,
      fashonEarnings,
    };

    res.json(earnings);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

async function fetchCategoryWiseProduct(category) {
  let earnings = o;
  let categoryOrders = await Order.find({
    "products.product.category": category,
  });

  for (let i = 0; i < categoryOrders.length; i++) {
    for (let j = 0; j < categoryOrders[i].products.length; j++) {
      earnings +=
        categoryOrders[i].products[j].quantity *
        categoryOrders[i].products[j].product.price;
    }
  }
  return earnings;
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getOrders,
  changeOrderStatus,
  analystics,
};
