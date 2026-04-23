import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [BestSeller, setBestSeller] = useState([]);
  const { navigate } = useContext(ShopContext);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller === true);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="p-10 cursor-pointer">
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Explore our best curated collections
          </p>
        </div>

        <div
          onClick={() => navigate("/collection")}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        >
          {BestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
