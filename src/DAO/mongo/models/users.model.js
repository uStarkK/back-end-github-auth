//@ts-check
import { model, Schema } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 100,
    },
    lastName: {
        type: String,
        required: true,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    age:{
        type: Number,
        min: [18, 'Minimum age should be 18'],
        max: [100, 'Maximum age should be 100'],
    },
    password: {
        type: String,
        required: true,
        max: 100,
    },
    cartId:{
        type: Schema.Types.ObjectId,
        ref: "carts",
        required: true  
    },

    role: {
        type: String,
        required: true,
        default: "user"
    },
});
userSchema.plugin(monsoosePaginate);

userSchema.pre("findOne", function () {
    this.populate("cartId")
})
userSchema.pre("findOneAndUpdate", function () {
    this.populate("cartId")
})
export const UserModel = model('users', userSchema);