import { ObjectId } from "mongoose";
import ProductsDAO from "../DAO/mongo/ProductsDAO.js";
import { logger } from "../Utils/logger.js";
import { generateProductCode } from "../Utils/utils.js";
import UserService from "./UserService.js";
import CustomError from "./errorHandling/CustomError.js";
import HandledErrors from "./errorHandling/ErrorCode.js";
import {getErrorCause} from "./errorHandling/info.js";




class ProductService {
    async createOne(product, uid){
        const user = await UserService.getOne(uid)
        if(user.role === "premium"){
            console.log(product, user, "asd")
            product.owner = user._id
            logger.debug(product)
        }
        product.code = await generateProductCode()
        logger.debug(product)
        return await ProductsDAO.createInDB(product)
    }
    async getAll(query, pagination) {
        const queryResult = await ProductsDAO.paginate(query, pagination);
        return queryResult
    }
    async getById(pid) {
        const product =  await ProductsDAO.fetchById(pid)
        if(!product){
            CustomError.createError({
                name: "Product not found",
                cause: getErrorCause("Product not found"),
                message: "An error occurred while trying to find the requested product",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        return product
    }
    async updateProduct(pid, update){
        const updatedProduct = await ProductsDAO.updateOne({ _id: pid }, update);
        return updatedProduct
    }
    async deleteProduct(pid, uid){
        const user = await UserService.getOne(uid)
        const product = await this.getById(pid);
        console.log(product.owner)
        console.log(user._id)
        if( user.role === "admin"){
            return await ProductsDAO.deleteOne(pid)
        }
        if ( product.owner?.equals(user._id)){
            logger.info(`Product from user ${product.owner.email} has been deleted by ${user.email}`)
            return await ProductsDAO.deleteOne(pid)
        }else{
            logger.error("Lacking Permissions")
            CustomError.createError({
                name: "Lacking permissions",
                cause: getErrorCause("Lacking permissions"),
                message: "Cannot delete a product that does not belong to you",
                code: HandledErrors.VALIDATION_ERROR
            })
        }
    }
}



export default new ProductService