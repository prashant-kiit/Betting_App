import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

export default User;