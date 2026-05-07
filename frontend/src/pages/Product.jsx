import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import DisplayRelatedProducts from "../components/DisplayRelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="p-10">
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/**product data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/**product images */}

          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt=""
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer "
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} alt="" className="w-full h-auto" />
            </div>
          </div>
          {/**product information */}
          <div className="flex-1">
            <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <p className="font-semibold">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border border-gray-300 px-4 py-2 hover:bg-gray-300 bg-gray-100 ${item === size ? "border-2 border-orange-500" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                  if (!size) {
                    toast.error("Please select a size");
                    return;
                  }
                addToCart(productData._id, size);
                toast.success("Product added successfully!");
              }}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5 cursor-pointer"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex-col flex gap-1">
              <p className="">100% Original Product</p>
              <p> Cash on Delivery Available</p>
              <p> Easy Returns & Exchanges</p>
            </div>
          </div>
        </div>
        {/**review section........... */}
        <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm mx-2">Reviews(122)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur itaque inventore, possimus delectus ad nemo deleniti
              dicta voluptates, porro rerum cum. Quam voluptate ab quae saepe
              nisi assumenda tempore earum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do{" "}
            </p>
          </div>
        </div>

        {/** display related products.........*/}
        <DisplayRelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
