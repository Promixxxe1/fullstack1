import orderModel from "../models/orderModel.js";
import UserModel from "../models/UserModel.js";

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

const placeOrderStripe = async (req, res) => {};

//placing order using razorpay method/////

const placeOrderRazorPay = async (req, res) => {};

//All orders for admin panel///////

const allOrders = async(req, res)=>{
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders});
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
}

const allOrders = async (req, res) => {};

//user orders for frontend/////////
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId})
        res.json({ success: true, orders});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
};

//update orders status from admin panel////
const updateStatus = async (req, res) => {};

export {
  placeOrderCod,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
