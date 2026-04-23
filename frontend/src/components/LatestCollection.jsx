import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from "./Title"
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const{ products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    


  return (
    <div className='p-10'>
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="w-3/4 m-auto text-sm md:text-base text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
            placeat animi libero nihil !
          </p>
        </div>

        {/*products collections.... */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
          {latestProducts.map((Item, index) => (
            <ProductItem
              key={index}
              id={Item._id}
              image={Item.image}
              name={Item.name}
              price={Item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestCollection