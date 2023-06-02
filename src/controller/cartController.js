const {
    model
} = require("mongoose");
const 
  Cart
 = require("../model/cart");
const item = require("../model/item");
const user = require("../model/user");
class cartController {
  
 async addToCart(req, res) {
  if(!res.locals.isLoggedIn) {
    res.redirect('/login')
    return;
  }
  const productId = req.params._id;
  const userId = req.user._id;
  
  const product = await item.findById(productId);
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity++;
      await cart.save()
    } else {
      cart.items.push({ product:product._id, quantity: 1 });
      await cart.save()
    }
  } else {
    const newCart = new Cart({ user: userId, items: [{ product:product._id, quantity: 1 }] });
    await newCart.save();
  }
 console.log('thêm vào giỏ hàng thành công')
  res.redirect('/')
}
async deleteFromCart(req, res) {
  console.log("I AM HERE")
     const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    const productId = req.params._id;
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity--;
      await cart.save();
      if(cart.items[existingItemIndex].quantity==0) {
        cart.items.splice(existingItemIndex, 1);
       await cart.save();
      }
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product not found in cart' });
    }
  } else {
    res.status(404).send({ message: 'Cart not found' });
}
}
 async getCart(req, res) {
  if(!res.locals.isLoggedIn){
    res.redirect('/login')
    return  
  }
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
  const productList = cart.items.map(item => {
    const product = item.product.toObject();
    product.quantity = item.quantity;
    return product
  });

  res.render('cart', {productList});
}
}
module.exports = new cartController