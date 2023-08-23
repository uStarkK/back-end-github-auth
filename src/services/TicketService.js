import TicketsDAO from "../DAO/mongo/TicketsDAO.js";


class TicketService{
    async getAll(){
        return await TicketsDAO.fetchAll()
    }
    async createOne(ticket){
        return await TicketsDAO.createOne(ticket)
    }
    async getById(tid){ 
        const ticket = await TicketsDAO.fetchOne(tid)
        if(!ticket){
            throw new Error("Ticket not found")
        }
        return ticket
    }
}



export default new TicketService