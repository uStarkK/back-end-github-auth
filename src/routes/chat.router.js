import express from "express";
import { isUser } from "../middlewares/auth.js";
export const testChat = express.Router();

testChat.get("/", isUser, (req, res) => {
return res.status(200).render("chat", {});
});


