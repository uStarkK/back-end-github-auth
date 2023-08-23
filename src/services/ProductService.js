import ProductsDAO from "../DAO/mongo/ProductsDAO.js";




class ProductService {
    async createOne(product){
        return await ProductsDAO.createInDB(product)
    }
    async getAll(query, pagination) {
        const queryResult = await ProductsDAO.paginate(query, pagination);
        return queryResult
    }
    async getById(pid) {
        const product =  await ProductsDAO.fetchById(pid)
        if(!product){
            throw new Error("Product does not exist")
        }
        return product
    }
    async updateProduct(pid, update){
        const updatedProduct = await ProductsDAO.updateInDB({ _id: pid }, update);
        return updatedProduct
    }
    async deleteProduct(pid){
        return await ProductsDAO.deleteFromDB(pid)
    }
}



export default new ProductService