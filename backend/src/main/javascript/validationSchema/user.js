import Schema from "validate";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
  },
});

export default userSchema;
