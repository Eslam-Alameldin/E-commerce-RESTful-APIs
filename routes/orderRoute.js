const express = require("express");
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require("../services/orderService");

const {
  createCashOrderValidator,
  checkoutSessionValidator,
  updateOrderToPaidValidator,
  updateOrderToDeliveredValidator,
  findSpecificOrderValidator,
} = require("../utils/validators/orderValidator");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

router.get(
  "/checkout-session/:cartId",
  authService.allowedTo("user"),
  checkoutSessionValidator,
  checkoutSession
);

router
  .route("/:cartId")
  .post(
    authService.allowedTo("user"),
    createCashOrderValidator,
    createCashOrder
  );
router.get(
  "/",
  authService.allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get(
  "/:id",
  authService.allowedTo("admin", "manager", "user"),
  findSpecificOrderValidator,
  findSpecificOrder
);

router.put(
  "/:id/pay",
  authService.allowedTo("admin", "manager"),
  updateOrderToPaidValidator,
  updateOrderToPaid
);
router.put(
  "/:id/deliver",
  authService.allowedTo("admin", "manager"),
  updateOrderToDeliveredValidator,
  updateOrderToDelivered
);

module.exports = router;
