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
    const new_team1_total_bets = match.team1_total_bets + 1;

    matchPatchBody = {
      team1_abs_amt: new_team1_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
      team1_total_bets: new_team1_total_bets,
    };
  } else if (req.body.betOn === match.team2) {
    const new_team2_abs_amt = match.team2_abs_amt + req.body.amount;
    const new_total_abs_amt =
      match.team1_abs_amt + new_team2_abs_amt + match.draw_abs_amt;
    const new_team1_rel_amt = (match.team1_abs_amt / new_total_abs_amt) * 100;
    const new_team2_rel_amt = (new_team2_abs_amt / new_total_abs_amt) * 100;
    const new_draw_rel_amt = (match.draw_abs_amt / new_total_abs_amt) * 100;
    const new_team2_total_bets = match.team2_total_bets + 1;

    matchPatchBody = {
      team2_abs_amt: new_team2_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
      team2_total_bets: new_team2_total_bets,
    };
  } else if (req.body.betOn === "Draw") {
    const new_draw_abs_amt = match.draw_abs_amt + req.body.amount;
    const new_total_abs_amt =
      match.team1_abs_amt + match.team2_abs_amt + new_draw_abs_amt;
    const new_team1_rel_amt = (match.team1_abs_amt / new_total_abs_amt) * 100;
    const new_team2_rel_amt = (match.team2_abs_amt / new_total_abs_amt) * 100;
    const new_draw_rel_amt = (new_draw_abs_amt / new_total_abs_amt) * 100;
    const new_draw_total_bets = match.draw_total_bets + 1;

    matchPatchBody = {
      draw_abs_amt: new_draw_abs_amt,
      team1_rel_amt: new_team1_rel_amt,
      team2_rel_amt: new_team2_rel_amt,
      draw_rel_amt: new_draw_rel_amt,
      draw_total_bets: new_draw_total_bets,
    };
  } else {
    return false;
  }

  const match = await Match.findOneAndUpdate(
    {
      _id: new Types.ObjectId(`${req.body.matchId}`),
    },
    matchPatchBody,
    { new: true }
  );

  return match;
};

export const getAllMatch = async () => {
  const matches = await Match.find({});
  return matches;
};

export const getMatch = async (matchId) => {
  const match = await Match.findOne({
    _id: new Types.ObjectId(`${matchId}`),
  });

  return match;
};

export const getUser = async (userId) => {
  const user = await User.findOne({
    email: userId,
  });

  return user;
};

export const isThisUsersFirstBetOnTheMatch = async (userEmail, matchId) => {
  const bet = await Bet.findOne({
    userId: userEmail,
    matchId: matchId,
  });

  if (!bet) return null;

  return bet;
};

export const ifMoreThanMinimumAmount = (amount, minimumAmount) => {
  if (amount >= minimumAmount) return true;
  return false;
};

export const isLessThanWallet = (amount, userWallet) => {
  if (amount <= userWallet) return true;
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

  return bet;
};

export const ifMatchActive = (matchStatus) => {
  return matchStatus === "ACTIVE";
};

export const isBetSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = betSchema.validate(reqBody);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};

export const isTeamValid = (betOn, match) => {
  if (betOn === match.team1) return true;
  if (betOn === match.team2) return true;
  if (betOn === "Draw") return true;
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

export const creditMoney = async (reqBody) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const userUpdated = await User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      wallet: user.wallet + req.body.wallet,
    },
    {
      new: true,
    }
  );

  return userUpdated;
};

export const debitMoney = async (req, user) => {
  const user = await User.findOneAndUpdate(
    {
      email: user.email,
    },
    {
      wallet: user.wallet - req.body.amount,
    },
    {
      new: true,
    }
  );

  return user;
};

export const isUserSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = userSchema.validate(reqBody);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};

export const getWinProspects = (match, betOn) => {
  let potentialAmount = 0;

  if (betOn === match.team1) {
    potentialAmount =
      ((match.team2_abs_amt + match.draw_abs_amt) * 0.9) /
      (match.team1_total_bets + 1);
  }
  if (betOn === match.team2) {
    potentialAmount =
      ((match.team1_abs_amt + match.draw_abs_amt) * 0.9) /
      (match.team2_total_bets + 1);
  }

  if (betOn === "Draw") {
    potentialAmount =
      ((match.team1_abs_amt + match.team2_abs_amt) * 0.9) /
      (match.draw_total_bets + 1);
  }

  return potentialAmount;
};
