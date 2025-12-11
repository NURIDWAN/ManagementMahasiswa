import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    fullname: string;
    email: string;
    password: string;
    createDate: Date;
    updateDate: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'user');

export default User;
