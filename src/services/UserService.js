import { UserModel } from '../DAO/mongo/models/users.model.js';
import UsersDAO from '../DAO/mongo/UsersDAO.js';
class UserService {
    validateUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            CustomError.createError({
                name: "User creation error",
                cause: getErrorCause(this.name, {firstName, lastName, email}),
                msg: "An error occured while trying to set the user",
                code: HandledErrors.INVALID_TYPES_ERROR
            });
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

    async deleteOne(uid) {
        const deleted = await UserModel.deleteOne({ _id: uid });
        return deleted;
    }

    async updateOne(uid, firstName, lastName, email) {
        if (!uid) {
            CustomError.createError({
                name: "Invalid id",
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to process the last request",
                code: HandledErrors.INVALID_TYPES_ERROR
            })
        };
        this.validateUser(firstName, lastName, email);
        const userUpdated = await UserModel.updateOne({ _id: id }, { firstName, lastName, email });
        return userUpdated;
    }
}

export default new UserService()