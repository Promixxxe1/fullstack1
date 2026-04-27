import express from "express";
import {
  placeOrderCod,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();
//admin features//////////////
orderRouter.post(`/list`, adminAuth, allOrders);
orderRouter.post(`/status`, adminAuth, updateStatus);

//payment features.../
orderRouter.post(`/place`, authUser, placeOrderCod);
orderRouter.post(`/stripe`, authUser, placeOrderStripe);
orderRouter.post(`/razorpay`, authUser, placeOrderRazorPay);

//user features////
orderRouter.post(`/userorders`, authUser, userOrders);

//verify payments
orderRouter.post(`/verifyStripe`, authUser, verifyStripe);
orderRouter.post(`/verifyRazorpay`, authUser, verifyRazorpay);

export default orderRouter;
