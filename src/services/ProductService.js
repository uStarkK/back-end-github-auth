import ProductsDAO from "../DAO/mongo/ProductsDAO.js";
import UserService from "./UserService.js";
import CustomError from "./errorHandling/CustomError.js";
import HandledErrors from "./errorHandling/ErrorCode.js";
import {getErrorCause} from "./errorHandling/info.js";




class ProductService {
    async createOne(product, uid){
        const user = await UserService.getOne(uid)
        if(user.role === "premium" || user.role === "admin"){
            product.owner = user._id
            console.log(product)
        }
        console.log(product)
        /* return await ProductsDAO.createInDB(product) */
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
                cause: getErrorCause(this.name),
                msg: "An error occurred while trying to find the requested product",
                code: HandledErrors.RESOURCE_NOT_FOUND_ERROR
            })
        }
        return product
    }
    async updateProduct(pid, update){
        const updatedProduct = await ProductsDAO.updateOne({ _id: pid }, update);
        return updatedProduct
    }
    async deleteProduct(pid){
        return await ProductsDAO.deleteFromDB(pid)
    }
}



export default new ProductService