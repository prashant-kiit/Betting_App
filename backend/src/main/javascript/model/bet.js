import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const BetSchema = new Schema({
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

const Bet = model("Bet", BetSchema);

export default Bet;
