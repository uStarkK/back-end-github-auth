import dotenv from "dotenv";
import multer from "multer";

dotenv.config()

const { DB } = process.env

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploader = multer({ storage });

// DIRNAME //
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(path.dirname(__filename));

// MONGO //
import { connect } from "mongoose";
export async function connectMongo() {
    await connect(
        /* PONER TU STRING ENTERO ACA */
        "mongodb+srv://Nahu22:nahu123@ecommerce.p4croqf.mongodb.net/", {
        dbName: "ecommerce"
    }
    );
    console.log("Connected to Mongo")
}






// SOCKET //

import { Server } from 'socket.io';
import ProductService from "../services/ProductService.js";
import { MsgModel } from "../DAO/mongo/models/msgs.model.js";

export const startSocket = async (httpServer) => {
    const socketServer = new Server(httpServer)
    socketServer.on('connection', (socket) => {
        console.log('Usuario conectado')

        socket.on('product:create', async (newProduct) => {
            console.log("Product created")
            const product = await ProductService.createOne(newProduct)
            socketServer.emit('product:created', product)
        })

        socket.on('product:delete', async (id) => {
            await ProductService.deleteProduct(id)
            socketServer.emit('product:deleted', id)
        })
        socket.on('msg_front_to_back', async (msg) => {
            const msgCreated = await MsgModel.create(msg);
            const msgs = await MsgModel.find({});
            socketServer.emit('todos_los_msgs', msgs);
        });
    })

    return socketServer
}





// BCRYPT


import bcrypt from "bcrypt";


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(11));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)



//// ERROR HANDLING 


export const sendErrorResponse = (res, err) => {
    if (err.message === 'Cart not found') {
        return res.status(404).json({
            status: "Error",
            msg: "An error occurred while trying to find the cart. Please try again"
        });
    }
    if (err.message === 'Product not found') {
        return res.status(404).json({
            status: "Error",
            msg: "An error occurred while trying to find the product. Please try again"
        });
    }
    if (err.message === 'Not enough stock') {
        return res.status(404).json({
            status: "Error",
            msg: "The product is either unavailable or it does not have enough stock remaining"
        });
    }
    if (err.message === 'No items available for purchase') {
        return res.status(404).json({
            status: "Error",
            msg: "There are no available items in your cart"
        });
    }
    if (err.message === 'Ticket not found') {
        return res.status(404).json({
            status: "Error",
            msg: "An error occurred while trying to find the ticket. Please try again"
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
};


///// Generate ticket's Code
import { TicketModel } from "../DAO/mongo/models/tickets.model.js";


export async function generateTicketCode() {
    const existingTickets = await TicketModel.find({}, { code: 1 }).sort({ code: -1 }).limit(1); // Retrieves all Ticket codes and sorts them in descending order, starting from the last one

    if (existingTickets.length === 0) {
        return 'TICKET0001'; // Starts with a default code
    }

    const lastCode = existingTickets[0].code; // Extracts last code (Now in position 0 because of the reversed sorting)
    const lastNumber = parseInt(lastCode.substr(6), 10); // Extracts the numeric part of the string starting from position 6
    if (lastNumber === 9999) {
        // Increase the number of digits for the numeric part
        const newNumber = lastNumber + 1;
        const newCode = `TICKET${newNumber.toString().padStart(5, '0')}`;
        return newCode;
    }

    const newNumber = lastNumber + 1; // Increment the numeric part
    const newCode = `TICKET${newNumber.toString().padStart(4, '0')}`;

    return newCode;
}

export async function generateProductCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

///////////////// Easier Time readibility

export function parseLastConnection(lastConnection) {
    const dateString = lastConnection

    // Parse the date string into a JavaScript Date object
    const date = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - date;

    // Define the time units
    const minute = 60 * 1000; // 1 minute in milliseconds
    const hour = minute * 60; // 1 hour in milliseconds
    const day = hour * 24; // 1 day in milliseconds
    const month = day * 30; // An approximate month
    const year = day * 365; // An approximate year

    // Determine the time unit to display
    let timeAgo;
    if (timeDifference < minute) {
        timeAgo = "just now";
    } else if (timeDifference < hour) {
        const minutesAgo = Math.floor(timeDifference / minute);
        timeAgo = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < day) {
        const hoursAgo = Math.floor(timeDifference / hour);
        timeAgo = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < month) {
        const daysAgo = Math.floor(timeDifference / day);
        timeAgo = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < year) {
        const monthsAgo = Math.floor(timeDifference / month);
        timeAgo = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
    } else {
        const yearsAgo = Math.floor(timeDifference / year);
        timeAgo = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
    }

    
    return timeAgo
}