import { model, Schema } from 'mongoose';

const schema = new Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
    timestamp: {type: Date, default: Date.now}
});

export const MsgModel = model('msgs', schema);
