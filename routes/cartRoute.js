const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../services/cartService");
const authService = require("../services/authService");

const {
  addProductToCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
  removeSpecificCartItemValidator,
} = require("../utils/validators/cartValidator");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));
router
  .route("/")
  .post(addProductToCartValidator, addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put("/applyCoupon", applyCouponValidator, applyCoupon);

router
  .route("/:itemId")
  .put(updateCartItemQuantityValidator, updateCartItemQuantity)
  .delete(removeSpecificCartItemValidator, removeSpecificCartItem);

module.exports = router;
