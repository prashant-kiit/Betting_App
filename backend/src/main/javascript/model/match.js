import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const MatchSchema = new Schema({
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  minimumAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "ACTIVE",
  },
  total_bets: {
    type: Number,
    required: true,
    default: 0,
  },
  team1_abs_amt: {
    type: Number,
    required: true,
    default: 0,
  },
  team2_abs_amt: {
    type: Number,
    required: true,
    default: 0,
  },
  draw_abs_amt: {
    type: Number,
    required: true,
    default: 0,
  },
  team1_rel_amt: {
    type: Number,
    required: true,
    default: 0,
  },
  team2_rel_amt: {
    type: Number,
    required: true,
    default: 0,
  },
  draw_rel_amt: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Match = model("Match", MatchSchema);

export default Match;
