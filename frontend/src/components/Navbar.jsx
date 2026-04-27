import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setCartItems,
    setToken,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    setCartItems({});
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between py-5 px-10 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-36 " alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-3/4 border-none h-1 rounded-2xl bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-3/4 border-none h-1 rounded-2xl bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-3/4 border-none h-1 rounded-2xl bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-3/4 border-none h-1 rounded-2xl bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex gap-6 items-center">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />

        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="cart"
            className="w-5 cursor-pointer"
          />

          {/**dropdown menu........... */}

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 roudned-">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/order")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute bottom-[-5px] w-4 text-center right-[-5px] leading-4 rounded-full text-sm text-white bg-black">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="cursor-pointer w-5 sm:hidden"
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="flex items-center gap-4 p-3 cursor-pointer py-2 pl-6 border"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="flex items-center gap-4 p-3 cursor-pointer py-2 pl-6 border"
          >
            <p>COLLECTION</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="flex items-center gap-4 p-3 cursor-pointer py-2 pl-6 border"
          >
            <p>ABOUT</p>
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="flex items-center gap-4 p-3 cursor-pointer py-2 pl-6 border"
          >
            <p>CONTACT</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
