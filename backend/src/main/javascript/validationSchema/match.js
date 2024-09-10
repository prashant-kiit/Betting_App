import Schema from "validate";

const matchSchema = new Schema({
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
});

export default matchSchema;
