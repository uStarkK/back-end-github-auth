import { RecoveryCodesModel } from "./models/recoveryCodes.js";
import { UserModel } from "./models/users.model.js";



class UserDAO {
    async fetchAllUsers(){
        return await UserModel.find({}).lean().exec()
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
    async createRecoveryCode(code){
        await RecoveryCodesModel.create(code);
    }
    async findRecoveryCode(email){
        const foundCode = await RecoveryCodesModel.find({email: email})
        return foundCode
    }
    async updatePassword(email, newPassword){
        await UserModel.updateOne({email}, {$set: {password: newPassword}})
    }
}


export default new UserDAO