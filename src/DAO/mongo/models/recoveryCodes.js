import { Schema, model } from 'mongoose';
const schema = new Schema({
    email: { type: String, required: true, max: 254, min: 5 },
    code: { type: String, required: true, max: 120, unique: true },
    expire: { type: Number, required: true },

}, { versionKey: false });


export const RecoveryCodesModel = model('recover-codes', schema);