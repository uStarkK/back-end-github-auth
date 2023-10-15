import { connect } from "mongoose";
import mongoose from "mongoose";
import { UserModel } from "./src/DAO/mongo/models/users.model.js";
import { ProductsModel } from "./src/DAO/mongo/models/products.model.js";


// Connect to MongoDB
await connect(
    /* PONER TU STRING ENTERO ACA */
    "mongodb+srv://Nahu22:nahu123@ecommerce.p4croqf.mongodb.net/", {
    dbName: "ecommerce"
}
);
console.log("Connected to Mongo")


async function updateProducts() {
    try {
        
        const productsToUpdate = await ProductsModel.find({owner: {$exists: true}})
        console.log(productsToUpdate.length)
        for (const product of productsToUpdate) {
            product.owner = null; 
            await product.save(); 
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        mongoose.connection.close(); // Closes the database connection
    }
}

updateProducts();