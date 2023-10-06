import { model, Schema } from "mongoose";


const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: new Date,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
})


export const TicketModel = model('tickets', ticketSchema);