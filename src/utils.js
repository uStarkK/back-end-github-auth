import multer from "multer";
import dotenv from "dotenv"

dotenv.config()

const {DB} = process.env

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
export const __dirname = path.dirname(__filename);

// MONGO //
import { connect } from "mongoose";
export async function connectMongo() {
    try {
        await connect(
            /* PONER TU STRING ENTERO ACA */
            "mongodb+srv://Nahu22:nahu123@ecommerce.p4croqf.mongodb.net/", {
            dbName: "ecommerce"
        }
        );
        console.log("Connected to Mongo")
        let products = await ProductsModel.find({});
        /* console.log(JSON.stringify(products, null, 2)); */


        /* const copyDataToMongo = async () =>{
            const products =  await productsData.getAll()
            console.log(products)
            for(const data of products){
                const newData = new ProductsModel(data);
                await newData.save()
            }
        }
        
        copyDataToMongo() */
    } catch (e) {
        console.log(e);
        throw "cannot connect to the db";
    }
}





// SOCKET //

import { Server } from 'socket.io';
import { ProductManager } from './DAO/class.js';

import { MsgModel } from "./DAO/models/msgs.model.js";
import { ProductsModel } from "./DAO/models/products.model.js";
const productsData = new ProductManager("./products.json")

export const startSocket = (httpServer) => {
    const socketServer = new Server(httpServer)
    socketServer.on('connection', (socket) => {
        console.log('Usuario conectado')

        socket.on('product:create', async (newProduct) => {
            console.log("aaaa")
            const product = await productsData.saveProduct(newProduct)
            socketServer.emit('product:created', product)
        })

        socket.on('product:delete', async id => {
            console.log(await productsData.getProductByid(parseInt(id)))
            await productsData.deleteProduct(parseInt(id))
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


export function isAdmin(req, res, next) {
    if (req.session?.admin){
        return next()
    }
    return res.status(401).send("Error de autorizacion")
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
            msg: "The cart you are looking for does not exist"
        });
    }
    if (err.message === 'Product not found') {
        return res.status(404).json({
            status: "Error",
            msg: "Product does not exist"
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
};