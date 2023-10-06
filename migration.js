import { connect } from "mongoose";
import mongoose from "mongoose";
import { UserModel } from "./src/DAO/mongo/models/users.model.js";


// Connect to MongoDB
await connect(
    /* PONER TU STRING ENTERO ACA */
    "mongodb+srv://Nahu22:nahu123@ecommerce.p4croqf.mongodb.net/", {
    dbName: "ecommerce"
}
);
console.log("Connected to Mongo")


async function updateUsers() {
    try {
        
        const usersToUpdate = await UserModel.find({lastConnection: {$exists: false}})
        console.log(usersToUpdate)
        for (const user of usersToUpdate) {
            user.lastConnection = new Date(); // Set lastConnection to the current date and time
            await user.save(); // Saves the updated user
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        mongoose.connection.close(); // Closes the database connection
    }
}

updateUsers();