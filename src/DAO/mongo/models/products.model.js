//@ts-check
import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    desc: {
        type: String,
        required: true,
        max: 500
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 9999,
    },
    code:{
        type: String
    },
    category: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 9999,
    },
    status: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null
    }
})

productsSchema.plugin(mongoosePaginate)
productsSchema.index({ category: 'text' })

export const ProductsModel = model("products", productsSchema)