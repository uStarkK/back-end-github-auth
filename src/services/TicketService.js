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
            CustomError.createError({
                name: "Ticket not found",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested ticket",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        return ticket
    }
}



export default new TicketService