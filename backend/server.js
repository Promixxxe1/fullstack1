import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app configuration
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:5174", // Admin panel
    "http://localhost:5175", // Admin panel (alternate port)
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "token", "Authorization"],
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send(" API WORKING!");
});

// Only start server in development (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await connectDB();
      await connectCloudinary();
      app.listen(port, () => console.log(`server started on PORT: ${port}`));
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  })();
} else {
  // For Vercel production, initialize connections but don't listen
  connectDB().catch((error) => {
    console.error("Database connection failed:", error);
  });
  connectCloudinary().catch((error) => {
    console.error("Cloudinary connection failed:", error);
  });
}

// Export app for Vercel serverless
export default app;
