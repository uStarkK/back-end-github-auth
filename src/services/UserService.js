import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../DAO/mongo/models/users.model.js';
import UsersDAO from '../DAO/mongo/UsersDAO.js';
import { sendMail } from '../Utils/emailRecovery.js';
import { logger } from '../Utils/logger.js';
import { createHash, isValidPassword } from '../Utils/utils.js';
import CartService from './CartService.js';
import CustomError from './errorHandling/CustomError.js';
import HandledErrors from './errorHandling/ErrorCode.js';
import { generateUserErrorInfo, getErrorCause } from './errorHandling/info.js';
dotenv.config()

const { GOOGLE_EMAIL, GOOGLE_PW } = process.env

class UserService {
    validateUser(firstName, lastName, email) {
        if (!firstName || !lastName || !email) {
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({ firstName, lastName, email }),
                msg: "An error occured while trying to set the user",
                code: HandledErrors.INVALID_TYPES_ERROR
            });
        }
    }
    async getAll() {
        const users = await UsersDAO.fetchAllUsers()
        return users;
    }

    async getOne(uid) {
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
        if (user.role === "admin") {
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

    async updateOne({ firstName, lastName, email, role, uid }) {
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


    async recoverPassword(email) {
        try {
            const existingCode = await UsersDAO.findRecoveryCode(email)
            console.log(existingCode)
            if (existingCode == []) {
                console.log(existingCode, "ENTRE AL IF")
                for (const code of existingCode) {
                    if (code.expire > Date.now()) {

                        await sendMail({
                            from: GOOGLE_EMAIL,
                            to: email,
                            subject: "Recovery Code Already Exists",
                            html: `
                            <div>
                                <h1>A recovery code already exists for your account.</h1>
                                <p>Please use the existing code and try again later.</p>
                            </div>
                        `
                        });

                    }
                }
                return;
            }
            console.log("NO ENTRÉ AL IF")
            const newCode = uuidv4().toString();
            const expire = new Date(new Date().getTime() + 3600000); // Expires in 1 hour after being generated
            const hashedCode = createHash(newCode);
            const createdCode = { email, code: hashedCode, expire };
            await UsersDAO.createRecoveryCode(createdCode);
            await sendMail({
                from: process.env.GOOGLE_EMAIL,
                to: email,
                subject: "Recovery code",
                html: `
                    <div>
                        <h1>Your verification code is:</h1>
                        <h2>${newCode}</h2>
                        <p>Remember it, and use it on here:</p>
                        <a href='${process.env.API_URL}${process.env.PORT || ""}/api/sessions/verify-recover'>click here</a>
                    </div>
                `
            });
            return createdCode
        } catch (error) {
            logger.error({ name: error.name, msg: error.message });
            CustomError.createError({
                name: error.name,
                cause: getErrorCause(error.name),
                message: error.message,
                code: HandledErrors.VALIDATION_ERROR
            });
        }
    }

    async verifyRecover(verify) {
        try {
            const realCode = await UsersDAO.findRecoveryCode(verify.email);
            if (realCode && isValidPassword(verify.code, realCode)) {
                console.log('Code found');
                const newPassword = createHash(verify.password);
                await UsersDAO.updatePassword(verify.email, newPassword);
                console.log('Password updated')
            }
        } catch (error) {
            logger.error(error);
            CustomError.createError(error, {
                cause: getErrorCause(error.name),
                code: HandledErrors.INVALID_TYPES_ERROR
            });
        }
    } c
}

export default new UserService()