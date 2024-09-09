import { Types } from "mongoose";
import Match from "../model/match.js";

export const saveMatch = async (req) => {
  const match = new Match({
    team1: req.body.team1,
    team2: req.body.team2,
    minimumAmount: req.body.minimumAmount,
  });

  await match.save();

  return match.id;
};

export const setMatchStatus = async (req, status) => {
  const match = await Match.findOneAndUpdate(
    {
      _id: new Types.ObjectId(`${req.params.id}`),
    },
    {
      status: status,
    }
  );
};
