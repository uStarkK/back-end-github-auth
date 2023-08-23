import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        _id: false
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        
    }
})

cartSchema.pre('save', function (next) {
    this.createdAt = this.createdAt.toLocaleString('en-US');
    next();
});

cartSchema.pre("findOne", function () {
    this.populate("items.productId")
})
cartSchema.pre("findOneAndUpdate", function () {
    this.populate("items.productId")
})

export const CartModel = model("carts", cartSchema)