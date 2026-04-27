import "dotenv/config";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";

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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472140/ogo8cklzghzfqz2imsry.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472148/fhgfhkent17kexrinsy7.png",
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472161/ovterycrae2w9rdc149z.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472155/gdjlmthjan2abgpl7szb.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472168/igaxxgsdk8lycvuldmga.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472170/usge45p5ndfgseinmwa5.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472141/lwgivnht6w1h7rdza2ol.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472142/j7u2dp0yv7ipeqpod08a.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472169/mmxq1sagh9lw0x3gxpmn.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472145/ro3vj8bptxcsffichurx.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472162/yrs21kvetb0spcm0k1id.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472155/lftvgtwduxcpf70uhsou.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472131/jud1drbhee5kdpi9444b.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472155/rpljranrip29v70gs8co.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472142/iqoq0fsgbke6wrzb0ohs.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472155/vbsfeqbqufphnh6gjq8u.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472156/fsassbrquiy5dfoipboj.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472146/kj8hd9s2kl0p1q2r3s4t.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472147/a5b6c7d8e9f0g1h2i3j4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472153/w5x6y7z8a9b0c1d2e3f4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472154/l5m6n7o8p9q0r1s2t3u4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472155/v5w6x7y8z9a0b1c2d3e4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472157/f5g6h7i8j9k0l1m2n3o4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472158/p5q6r7s8t9u0v1w2x3y4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472159/z5a6b7c8d9e0f1g2h3i4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472160/j5k6l7m8n9o0p1q2r3s4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472151/x5y6z7a8b9c0d1e2f3g4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472152/t5u6v7w8x9y0z1a2b3c4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472150/n5o6p7q8r9s0t1u2v3w4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472149/h5i6j7k8l9m0n1o2p3q4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472149/d5e6f7g8h9i0j1k2l3m4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472148/b5c6d7e8f9g0h1i2j3k4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472147/z5a6b7c8d9e0f1g2h3i4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472146/x5y6z7a8b9c0d1e2f3g4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472145/v5w6x7y8z9a0b1c2d3e4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472144/t5u6v7w8x9y0z1a2b3c4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472143/r5s6t7u8v9w0x1y2z3a4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472142/p5q6r7s8t9u0v1w2x3y4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472141/n5o6p7q8r9s0t1u2v3w4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472140/l5m6n7o8p9q0r1s2t3u4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472139/j5k6l7m8n9o0p1q2r3s4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472138/h5i6j7k8l9m0n1o2p3q4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472137/f5g6h7i8j9k0l1m2n3o4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472136/d5e6f7g8h9i0j1k2l3m4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472135/b5c6d7e8f9g0h1i2j3k4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472134/z5a6b7c8d9e0f1g2h3i4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472133/x5y6z7a8b9c0d1e2f3g4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472132/v5w6x7y8z9a0b1c2d3e4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472131/t5u6v7w8x9y0z1a2b3c4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472130/r5s6t7u8v9w0x1y2z3a4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472129/p5q6r7s8t9u0v1w2x3y4.png",
    ],
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
    image: [
      "https://res.cloudinary.com/dyav6bvuc/image/upload/v1775472128/n5o6p7q8r9s0t1u2v3w4.png",
    ],
    date: 1716668445448,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await productModel.deleteMany({});
    const result = await productModel.insertMany(products);
    console.log(`Successfully added ${result.length} products to the database`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
