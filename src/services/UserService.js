import { UserModel } from '../DAO/models/users.model.js';
import UsersDAO from '../DAO/mongo/UsersDAO.js';
class UserService {
    validateUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            console.log('validation error: please complete firstName, lastname and email.');
            throw new Error('validation error: please complete firstName, lastname and email.');
        }
    }
    async getAll() {
        const users = await UsersDAO.fetchAllUsers()
        return users;
    }

    async createOne(firstName, lastName, email) {
        this.validateUser(firstName, lastName, email);
        const userCreated = await UserModel.create({ firstName, lastName, email });
        return userCreated;
    }

    async deletedOne(uid) {
        const deleted = await UserModel.deleteOne({ _id: uid });
        return deleted;
    }

    async updateOne(uid, firstName, lastName, email) {
        if (!uid) throw new Error('invalid _id');
        this.validateUser(firstName, lastName, email);
        const userUpdated = await UserModel.updateOne({ _id: id }, { firstName, lastName, email });
        return userUpdated;
    }
}

export default new UserService()