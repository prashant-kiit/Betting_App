import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = model("Admin", AdminSchema);

export default Admin;