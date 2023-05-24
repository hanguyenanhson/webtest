const {
    model
} = require("mongoose")
const {
    cart
} = require("../model/cart")
const { Product } = require("../model/item")
class cartController {
 async addToCart(req, res) {
    const productId = req.params._id;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity++;
    } else {
      cart.items.push({ product:product._id, quantity: 1 });
    }
  } else {
    const newCart = new Cart({ user: userId, items: [{ product:product._id, quantity: 1 }] });
    await newCart.save();
  }

  res.status(200).json({ message: 'Product added to cart successfully' });
}
async deleteFromCart(req, res) {
     const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    const productId = req.params.productId;
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex >= 0) {
      cart.items.splice(existingItemIndex, 1);
      await cart.save();
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product not found in cart' });
    }
  } else {
    res.status(404).send({ message: 'Cart not found' });
}
}
}
module.exports = new cartController