import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
    default: 1000,
  },
});

const User = model("User", UserSchema);

export default User;
