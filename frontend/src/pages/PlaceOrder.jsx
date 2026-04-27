import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (orderId, amount, currency) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "order payment",
      description: "Test Transaction",
      order_id: orderId,
      handler: async function (response) {
        try {
          const verifyResponse = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            {
              orderId: orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { token } },
          );

          if (verifyResponse.data.success) {
            toast.success("Payment verified successfully!");
            navigate("/order");
          } else {
            toast.error(verifyResponse.data.message);
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error(
            error.response?.data?.message || "Payment verification failed",
          );
        }
      },
      prefill: {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validate form data
      if (
        !formData.firstName ||
        !formData.email ||
        !formData.street ||
        !formData.city
      ) {
        toast.error("Please fill all delivery details");
        setLoading(false);
        return;
      }

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        setLoading(false);
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        //API CALL FOR COD METHOD
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );

          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/order");
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;
        }

        case "stripe": {
          const stripeResponse = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );

          if (stripeResponse.data.success) {
            const { session_url } = stripeResponse.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripeResponse.data.message);
          }

          break;
        }
        case "razorpay": {
          const razorpayResponse = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } },
          );
          if (razorpayResponse.data.success) {
            const { order } = razorpayResponse.data;
            initPay(order.id, order.amount, order.currency);
          }
          break;
        }

        default:
          toast.error("Please select a payment method");
          break;
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Error placing order",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/**......left side ui.................... */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onchangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              required
              onChange={onchangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            required
            onChange={onchangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Enter Valid Email Address"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onchangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onchangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              required
              onChange={onchangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onchangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zip Code"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              required
              onChange={onchangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            required
            onChange={onchangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone Number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/**........right side ui............... */}

        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            {/**............payment method selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full  ${method === "stripe" ? "bg-green-400" : ""}`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
                ></p>
                <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-green-400" : ""}`}
                ></p>
                <p className="text-gray-500 text-sm font-bold mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-14 py-3 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
