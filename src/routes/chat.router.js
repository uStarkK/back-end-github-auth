import express from "express";

export const testChat = express.Router();

testChat.get("/", (req, res) => {
return res.status(200).render("chat", {});
});


