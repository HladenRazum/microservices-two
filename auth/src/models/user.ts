import mongoose from 'mongoose'

type UserAttributes = {
  email: string
  password: string
}

type UserDoc = mongoose.Document & {
  email: string
  password: string
}

type UserModel = mongoose.Model<UserDoc> & {
  build(attributes: UserAttributes): UserDoc
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
