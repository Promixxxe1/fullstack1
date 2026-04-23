import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//function for add products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });

        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: sizes
        ? typeof sizes === "string"
          ? sizes.split(",").map((s) => s.trim())
          : sizes
        : [],
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for removing products
const removeProduct = async (req, res) => {
  try {
    const result = await productModel.findByIdAndDelete(req.body.id);

    if (!result) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product Removed Succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single products
const singleProduct = async (req, res) => {
  try { 
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { addProduct, listProducts, removeProduct, singleProduct };
