import express from "express";


export const loggerTest = express.Router();


loggerTest.get("/", (req, res) =>{
    req.logger.debug("This is a debug message");
    req.logger.http("This is an http message");
    req.logger.info("This is an info message")
    req.logger.warn("Hello! I'm an alert");
    req.logger.error("Hi! I'm an error");
    req.logger.fatal("I'm a fatal error! Good luck!");
    res.send("Prueba logger")
});