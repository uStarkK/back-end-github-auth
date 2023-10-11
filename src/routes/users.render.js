import express from "express";
import UserService from "../services/UserService.js";
import { isAdmin } from "../middlewares/auth.js";


export const userRender = express.Router();


userRender.get("/:uid", isAdmin, async (req, res)=>{
    const uid = req.params.uid
    const user = await UserService.getOne(uid)
    /* req.logger.debug(user) */
    res.render("userView", {firstName: user.firstName, lastName: user.lastName || "", email: user.email, role: user.role, userId: user._id })
})

