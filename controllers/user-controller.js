const Order = require("../models/order");
const { Product } = require("../models/product");
const User = require("../models/user");

const addToCart = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    const user = await User.findById(req.user);

    // check the cart length
    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;

      for (let i = 0; i < user.cart.length; i++) {
        // check if id is equals
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let products = user.cart.find((products) =>
          products.product._id.equals(product.id)
        );

        products.quantity += i;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }

    user = await user.save();
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const saveUserAddress = async (req, res) => {
  try {
    const { address } = req.body;

    let user = await User.findById(req.user);
    user.address = address;
    user = await user.save();
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }

    user = await user.save();
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const order = async (req, res) => {
  try {
    const { cart, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity <= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let user = await User.findById(req.user);

    user.cart = [];
    await user.saver();

    let order = new Order({
      products,
      totalPrice,
      address,
      userId: req.user,
      orderAt: new Date().getTime(),
    });

    order = await order.save();

    return res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });

    return res.json(orders);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  saveUserAddress,
  order,
  myOrders,
};
