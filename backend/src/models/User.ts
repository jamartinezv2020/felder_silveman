import mongoose, { Schema, Document } from 'mongoose';


export interface User {
    username: string;
    password: string;
    // otros campos necesarios
}

export type UserDocument = Document & User;

const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // otros campos del esquema
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;



