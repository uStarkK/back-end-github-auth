import express from "express"
import TicketService from "../services/TicketService"




const ticketRouter = express.Router()




ticketRouter.get("/", async (req, res) =>{
    const tickets = TicketService.getAll()
})