import { CartModel } from '../DAO/mongo/models/carts.model.js';
import { UserModel } from '../DAO/mongo/models/users.model.js';
import UsersDAO from '../DAO/mongo/UsersDAO.js';
import { logger } from '../Utils/logger.js';
import CartService from './CartService.js';
import CustomError from './errorHandling/CustomError.js';
import HandledErrors from './errorHandling/ErrorCode.js';
import { generateUserErrorInfo, getErrorCause} from './errorHandling/info.js';
class UserService {
    validateUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({firstName, lastName, email}),
                msg: "An error occured while trying to set the user",
                code: HandledErrors.INVALID_TYPES_ERROR
            });
        }
    }
    async getAll() {
        const users = await UsersDAO.fetchAllUsers()
        return users;
    }

    async getOne(uid){
        const user = await UsersDAO.fetchById(uid)
        return user
    }

    async createOne(firstName, lastName, email) {
        this.validateUser(firstName, lastName, email);
        const userCreated = await UserModel.create({ firstName, lastName, email });
        return userCreated;
    }

    async deleteOne(uid) {
        const user = await this.getOne(uid)
        if(user.role === "admin"){
            logger.error("Cannot delete an admin user")
            CustomError.createError({
                name: "Lacking Permissions",
                cause: "Error",
                msg: "You cannot delete this user due to lack of permissions",
                code: HandledErrors.VALIDATION_ERROR
            })
            
        }
        const deleted = await UserModel.deleteOne({ _id: uid });
        await CartService.deleteCart(user.cartId)
        return deleted;
    }

    async updateOne({firstName, lastName, email, role, uid}) {
        if (!uid) {
            CustomError.createError({
                name: "Invalid id",
                cause: getErrorCause("Invalid id"),
                msg: "An error occurred while trying to process the last request",
                code: HandledErrors.INVALID_TYPES_ERROR
            })
        };
        this.validateUser(firstName, lastName, email);
        const updatedUser = await UserModel.updateOne({ _id: uid }, { firstName, lastName, email, role });
        return updatedUser;
    }
}

export default new UserService()