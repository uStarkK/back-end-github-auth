import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { getUsers } from "../controllers/Render_side_controllers/users/getUsers.js";
import { getUserById } from "../controllers/Render_side_controllers/users/getUserById.js";


export const userRender = express.Router();


userRender.get("/", isAdmin, getUsers)



userRender.get("/:uid", isAdmin, getUserById)

