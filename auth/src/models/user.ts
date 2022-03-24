import {Schema, model, Model, Document} from "mongoose";
import {Password} from "@services/password";

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document {
    email: string;
    password: string
}

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPass = await Password.toHash(this.get('password'))
        this.set('password', hashedPass)
    }
    done()
})

const User = model<UserDoc, UserModel>('User', userSchema)

export {User}
