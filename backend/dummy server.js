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

// app configuration
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://forever-frontend-qklwi70o1-promixxxe1s-projects.vercel.app", // Matches the actual request
    "https://forever-frontend-psi-one.vercel.app",
    "https://forever-admin-lac-two.vercel.app",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "token", "Authorization"],
};

// Middlewares
app.use(cors(corsOptions)); // Apply CORS first
app.use(express.json());

// Note: You had app.use(cors(corsOptions)) twice in your snippet.
// You only need it once, before your route definitions.

//swagger setup
let swaggerDocument;
try {
  swaggerDocument = YAML.load("./swagger.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.warn("Swagger docs not available:", error.message);
}

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send(" API WORKING!");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Initialize connections
let dbConnected = false;
let dbConnecting = false;
let dbConnectPromise = null;

async function initializeConnections() {
  if (dbConnected) return;
  if (dbConnecting) return dbConnectPromise;

  dbConnecting = true;
  dbConnectPromise = (async () => {
    try {
      console.log("Attempting to connect to database...");
      await connectDB();
      console.log("Database connected successfully");

      console.log("Attempting to connect to Cloudinary...");
      await connectCloudinary();
      console.log("Cloudinary initialized successfully");

      dbConnected = true;
      return true;
    } catch (error) {
      console.error("Connection error:", error);
      dbConnecting = false;
      throw error;
    }
  })();

  return dbConnectPromise;
}

// Middleware to ensure connections are initialized before handling requests
app.use(async (req, res, next) => {
  try {
    if (!dbConnected && !dbConnecting) {
      await initializeConnections();
    } else if (dbConnecting && !dbConnected) {
      await dbConnectPromise;
    }
    next();
  } catch (error) {
    console.error("Connection middleware error:", error);
    res.status(503).json({
      success: false,
      message: "Service temporarily unavailable - database connection failed",
    });
  }
});

// Development server
if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await initializeConnections();
      app.listen(port, () => {
        console.log(`Development server started on PORT: ${port}`);
      });
    } catch (error) {
      console.error("Failed to start development server:", error);
      process.exit(1);
    }
  })();
}

// Export app for Vercel serverless
export default app;
