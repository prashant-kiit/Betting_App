import Schema from "validate";

const betSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  betOn: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default betSchema;
