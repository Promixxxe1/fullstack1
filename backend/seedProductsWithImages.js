import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productModel from "./models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "../frontend/src/assets");

const uploadImageToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    return null;
  }
};

const getImageUrl = async (imageFile) => {
  const fullPath = path.join(assetsPath, imageFile);
  if (fs.existsSync(fullPath)) {
    return await uploadImageToCloudinary(fullPath);
  }
  console.warn(`Image file not found: ${imageFile}`);
  return null;
};

const products = [
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    imageFiles: ["p_img1.png"],
    date: 1716634345448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    imageFiles: [
      "p_img2_1.png",
      "p_img2_2.png",
      "p_img2_3.png",
      "p_img2_4.png",
    ],
    date: 1716621345448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true,
    imageFiles: ["p_img3.png"],
    date: 1716234545448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    bestseller: true,
    imageFiles: ["p_img4.png"],
    date: 1716621345448,
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    imageFiles: ["p_img5.png"],
    date: 1716622345448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true,
    imageFiles: ["p_img6.png"],
    date: 1716623423448,
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img7.png"],
    date: 1716621542448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img8.png"],
    date: 1716622345448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img9.png"],
    date: 1716621235448,
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img10.png"],
    date: 1716622235448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    imageFiles: ["p_img11.png"],
    date: 1716623345448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img12.png"],
    date: 1716624445448,
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img13.png"],
    date: 1716625545448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img14.png"],
    date: 1716626645448,
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img15.png"],
    date: 1716627745448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img16.png"],
    date: 1716628845448,
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img17.png"],
    date: 1716629945448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img18.png"],
    date: 1716631045448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img19.png"],
    date: 1716632145448,
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img20.png"],
    date: 1716633245448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img21.png"],
    date: 1716634345448,
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img22.png"],
    date: 1716635445448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img23.png"],
    date: 1716636545448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img24.png"],
    date: 1716637645448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img25.png"],
    date: 1716638745448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img26.png"],
    date: 1716639845448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img27.png"],
    date: 1716640945448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img28.png"],
    date: 1716642045448,
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img29.png"],
    date: 1716643145448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img30.png"],
    date: 1716644245448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img31.png"],
    date: 1716645345448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img32.png"],
    date: 1716646445448,
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img33.png"],
    date: 1716647545448,
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img34.png"],
    date: 1716648645448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img35.png"],
    date: 1716649745448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img36.png"],
    date: 1716650845448,
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img37.png"],
    date: 1716651945448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img38.png"],
    date: 1716653045448,
  },
  {
    name: "Men Printed Plain Cotton Shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img39.png"],
    date: 1716654145448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img40.png"],
    date: 1716655245448,
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img41.png"],
    date: 1716656345448,
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img42.png"],
    date: 1716657445448,
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img43.png"],
    date: 1716658545448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img44.png"],
    date: 1716659645448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img45.png"],
    date: 1716660745448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img46.png"],
    date: 1716661845448,
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img47.png"],
    date: 1716662945448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img48.png"],
    date: 1716664045448,
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img49.png"],
    date: 1716665145448,
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img50.png"],
    date: 1716666245448,
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img51.png"],
    date: 1716667345448,
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    imageFiles: ["p_img52.png"],
    date: 1716668445448,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    console.log("Starting product upload with images...");

    const productsWithImages = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(
        `[${i + 1}/${products.length}] Uploading images and adding "${product.name}"...`,
      );

      const imageUrls = [];
      for (const imageFile of product.imageFiles) {
        const url = await getImageUrl(imageFile);
        if (url) {
          imageUrls.push(url);
        }
      }

      if (imageUrls.length > 0) {
        productsWithImages.push({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subCategory: product.subCategory,
          sizes: product.sizes,
          bestseller: product.bestseller,
          image: imageUrls,
          date: product.date,
        });
      }
    }

    const result = await productModel.insertMany(productsWithImages);
    console.log(
      `\n✅ Successfully added ${result.length} products with correct images to the database!`,
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
