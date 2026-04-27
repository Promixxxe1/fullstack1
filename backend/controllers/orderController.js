import orderModel from "../models/orderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
//global variables
const currency = "usd";
const shippingCharges = 10;

//GATWWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing order using COD method//////////

const placeOrderCod = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.body.userId; // From auth middleware

    console.log("Order request:", {
      userId,
      items,
      amount,
      address,
      paymentMethod,
    });

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID not found. Please login again.",
      });
    }

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    if (!amount || amount <= 0) {
      return res.json({ success: false, message: "Invalid order amount" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    console.log("Order saved:", savedOrder._id);

    const userUpdate = await UserModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    if (!userUpdate) {
      console.warn("User not found for ID:", userId);
    }

    res.json({
      success: true,
      message: "Order Placed",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using stripe method////////

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: paymentMethod || "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Shipping Charges",
        },
        unit_amount: Math.round(shippingCharges * 100), // Stripe expects amount in cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success = true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success = false&orderId=${newOrder._id}`,
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verify strtpe//////
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using razorpay method/////

const placeOrderRazorPay = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: paymentMethod || "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Razorpay order creation failed",
        });
      }
      res.json({
        success: true,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
        },
        razorpayKey: process.env.RAZORPAY_KEY_ID,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verify razorpay payment/////
const verifyRazorpay = async (req, res) => {
  const {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  try {
    // Verify the signature using Razorpay
    const crypto = require("crypto");
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Signature is valid, update the order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      const user = await orderModel.findById(orderId);
      await UserModel.findByIdAndUpdate(user.userId, { cartData: {} });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Signature is invalid, delete the order
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//All orders for admin panel///////

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user orders for frontend/////////
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update orders status from admin panel////
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Update status error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  verifyRazorpay,
  placeOrderCod,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
