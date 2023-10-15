import { ProductsModel } from "./models/products.model.js";



class ProductsDAO{
    async createInDB(product){
        return await ProductsModel.create(product)
    }
    async fetchAllProducts(){
        return await ProductsModel.find({})
    }
    async fetchById(pid){
        return await ProductsModel.findOne({ _id: pid})
    }
    async fetchAndUpdate(filter, update){
        return await ProductsModel.findOneAndUpdate(filter, update, {new: true, runValidators: true})
    }
    async updateOne(filter, update){
        return await ProductsModel.updateOne(filter, update)
    }
    async deleteOne(pid){
        return await ProductsModel.deleteOne({ _id: pid})
    }
    async paginate(query, pagination){
        return await ProductsModel.paginate(query, {...pagination})
    }
}



export default new ProductsDAO