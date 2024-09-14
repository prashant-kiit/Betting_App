import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/,
    ],
  },
  wallet: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Admin = model("Admin", AdminSchema);

export default Admin;
