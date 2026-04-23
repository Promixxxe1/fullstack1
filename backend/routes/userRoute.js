import express from "express";
import {loginUser, registerUser, loginAdmin} from "../controllers/userController.js";

const userRouter = express.Router();

//route for user login
userRouter.post("/login", loginUser);

//route for user registration
userRouter.post("/register", registerUser);

//route for admin login
userRouter.post("/admin/login", loginAdmin);

export default userRouter;