//@ts-check
import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code:{
        type: String,
        required:true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

productsSchema.plugin(mongoosePaginate)
productsSchema.index({ category: 'text' })

export const ProductsModel = model("products", productsSchema)