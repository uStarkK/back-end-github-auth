import { UserModel } from "./models/users.model.js";



class UserDAO {
    async fetchAllUsers(){
        return await UserModel.find({})
    }
    async fetchById(uid){
        return await UserModel.findOne({_id: uid})
    }
    async createNewUser(firstName, lastName, email){
        return await UserModel.create({ firstName, lastName, email });
    }
    async deleteUser(uid){
        return await UserModel.deleteOne({ _id: uid });
    }
    async updateUser(uid, firstName, lastName, email){
        return await UserModel.updateOne({ _id: uid }, { firstName, lastName, email });
    }
}


export default new UserDAO