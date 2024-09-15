import { Types } from "mongoose";
import betSchema from "../validationSchema/bet.js";
import userSchema from "../validationSchema/user.js";
import User from "../model/user.js";
import Match from "../model/match.js";
import Bet from "../model/bet.js";

export const patchMatch = async (req, match) => {
  let matchPatchBody = {};

  if (req.body.betOn === match.team1) {
    const new_team1_abs_amt = match.team1_abs_amt + req.body.amount;
    const new_total_abs_amt =
      new_team1_abs_amt + match.team2_abs_amt + match.draw_abs_amt;
    const new_team1_rel_amt = (new_team1_abs_amt / new_total_abs_amt) * 100;
    const new_team2_rel_amt = (match.team2_abs_amt / new_total_abs_amt) * 100;
    const new_draw_rel_amt = (match.draw_abs_amt / new_total_abs_amt) * 100;

    matchPatchBody = {
      team1_abs_amt: new_team1_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
    };
  } else if (req.body.betOn === match.team2) {
    const new_team2_abs_amt = match.team2_abs_amt + req.body.amount;
    const new_total_abs_amt =
      match.team1_abs_amt + new_team2_abs_amt + match.draw_abs_amt;
    const new_team1_rel_amt = (match.team1_abs_amt / new_total_abs_amt) * 100;
    const new_team2_rel_amt = (new_team2_abs_amt / new_total_abs_amt) * 100;
    const new_draw_rel_amt = (match.draw_abs_amt / new_total_abs_amt) * 100;

    matchPatchBody = {
      team2_abs_amt: new_team2_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
    };
  } else if (req.body.betOn === "Draw") {
    const new_draw_abs_amt = match.draw_abs_amt + req.body.amount;
    const new_total_abs_amt =
      match.team1_abs_amt + match.team2_abs_amt + new_draw_abs_amt;
    const new_team1_rel_amt = (match.team1_abs_amt / new_total_abs_amt) * 100;
    const new_team2_rel_amt = (match.team2_abs_amt / new_total_abs_amt) * 100;
    const new_draw_rel_amt = (new_draw_abs_amt / new_total_abs_amt) * 100;

    matchPatchBody = {
      draw_abs_amt: new_draw_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
    };
  } else {
    return false;
  }

  await Match.findOneAndUpdate(
    {
      _id: new Types.ObjectId(`${req.body.matchId}`),
    },
    matchPatchBody
  );

  return true;
};

export const getMatch = async (req) => {
  const match = await Match.findOne({
    _id: new Types.ObjectId(`${req.body.matchId}`),
  });

  return match;
};

export const getUser = async (req) => {
  const user = await User.findOne({
    email: req.body.userId,
  });

  return user;
};

export const isThisUsersFirstBetOnTheMatch = async (user, match) => {
  const bet = await Bet.findOne({
    userId: user.email,
    matchId: match._id,
  });

  if (!bet) return true;

  return false;
};

export const ifMoreThanMinimumAmount = (req, match) => {
  if (req.body.amount >= match.minimumAmount) return true;
  return false;
};

export const isLessThanWallet = (req, user) => {
  if (req.body.amount <= user.wallet) return true;
  return false;
};

export const saveBet = async (req) => {
  const bet = new Bet({
    userId: req.body.userId,
    matchId: new Types.ObjectId(`${req.body.matchId}`),
    betOn: req.body.betOn,
    amount: req.body.amount,
  });

  await bet.save();

  return bet.id;
};

export const ifMatchActive = (match) => {
  return match.status === "ACTIVE";
};

export const isBetSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = betSchema.validate(reqBody);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};

export const isTeamValid = (req, match) => {
  if (req.body.betOn === match.team1) return true;
  if (req.body.betOn === match.team2) return true;
  if (req.body.betOn === "Draw") return true;
  return false;
};

export const saveUser = async (req) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = new User({
      email: req.body.email,
    });
    await user.save();
  }
  return user;
};

export const creditMoney = async (req) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  await User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      wallet: user.wallet + req.body.wallet,
    }
  );

  return true;
};

export const debitMoney = async (req, user) => {
  await User.findOneAndUpdate(
    {
      email: user.email,
    },
    {
      wallet: user.wallet - req.body.amount,
    }
  );
};

export const isUserSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = userSchema.validate(reqBody);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};
