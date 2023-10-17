import { TicketModel } from "./models/tickets.model.js";


class TicketDAO{
    async fetchAll(){
        return await TicketModel.find({}).lean().exec()
    }
    async fetchOne(tid){
        return await TicketModel.findOne({_id: tid})
    }
    async deleteOne(tid){
        return await TicketModel.deleteOne({_id: tid})
    }
    async createOne(ticket){
        return await TicketModel.create({...ticket})
    }
}



export default new TicketDAO