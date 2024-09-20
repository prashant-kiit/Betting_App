import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import adminSchema from "../validationSchema/admin.js";
import matchSchema from "../validationSchema/match.js";
import Admin from "../model/admin.js";
import Match from "../model/match.js";
import Bet from "../model/bet.js";
import User from "../model/user.js";
import {
  AdminSchemaError,
  MatchSchemaError,
} from "../ErrorHandling/SchemaError.js";
import { MatchNotFound } from "../ErrorHandling/MatchError.js";
import { AdminNotFound } from "../ErrorHandling/AuthError.js";

export const isAdminSchemaValid = (reqQuery) => {
  let errorString = "";

  const errors = adminSchema.validate(reqQuery);

  if (errors.length === 0) return true;

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  throw new AdminSchemaError(errorString);
};

export const isMatchSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = matchSchema.validate(reqBody);

  if (errors.length === 0) return true;

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  throw new MatchSchemaError(errorString);
};

export const getAdmin = async (req) => {
  const admin = await Admin.findOne({
    username: req.query.username,
  });

  if (!admin) throw new AdminNotFound(req.query.username);

  return admin;
};

export const isPasswordCorrect = (req, admin) => {
  return admin.password === req.query.password;
};

export const getAdminToken = (admin) => {
  const token = jwt.sign(
    {
      username: admin.username,
    },
    // eslint-disable-next-line no-undef
    process.env.DEV_JWT_SECRET_KEY
  );

  return token;
};

export const saveMatch = async (req) => {
  const match = new Match({
    team1: req.body.team1,
    team2: req.body.team2,
    minimumAmount: req.body.minimumAmount,
  });

  await match.save();

  return match;
};

export const setMatchStatus = async (matchId, status) => {
  const match = await Match.findOneAndUpdate(
    {
      _id: new Types.ObjectId(`${matchId}`),
    },
    {
      status: status,
    }
  );

  if (!match) throw new MatchNotFound(matchId);

  return match;
};

export const updateMatch = async (req) => {
  const match = await Match.findOneAndUpdate(
    {
      _id: new Types.ObjectId(`${req.params.matchId}`),
    },
    {
      team1: req.body.team1,
      team2: req.body.team2,
      minimumAmount: req.body.minimumAmount,
    },
    {
      new: true,
    }
  );
  return match;
};

export const playMatch = (match) => {
  const winnerNo = Math.floor(Math.random() * 3);

  if (winnerNo === 0) {
    return match.team1;
  }
  if (winnerNo === 1) {
    return match.team2;
  }
  if (winnerNo === 2) {
    return "Draw";
  }

  return null;
};

export const getResult = async (winnerTeam, match) => {
  const winners = await getWinners(winnerTeam, match);

  if (winners.length === 0)
    return {
      winners: [],
      amountPerWinner: 0,
      adminShare: 0,
    };

  const { moneyPerWinner, adminShare } = getMoneyPerWinnerAndAdminShare(
    match,
    winnerTeam
  );

  return {
    winners: winners,
    amountPerWinner: moneyPerWinner,
    adminShare: adminShare,
  };
};

export const getWinners = async (winnerTeam, match) => {
  const winningBets = await Bet.find({
    matchId: match.id,
    betOn: winnerTeam,
  });

  let winners = [];
  for (const winningBet of winningBets) {
    const user = await User.findOne({
      email: winningBet.userId,
    });

    winners.push(user);
  }

  return winners;
};

export const getMoneyPerWinnerAndAdminShare = (match, betOn) => {
  let moneyPerWinner = 0;
  let adminShare = 0;

// u3 = 200 
// u1 = 100, u2 = 50, u3, u4  
// a : 150, b : 100, draw : 100
// a won
// u1 = 100 + ?, ad = 20, 
// u2 = 50 + ?, ad = 20, 
// case 1
// 0.90 * 200, 0.90 * 200 
// case 2
// 100/150 * 0.90 * 200 , 50/150 * 0.90 * 200 

// a : 150, b : 100, draw : 100
// a won
// u1 = 100 + ?, ad = 20, 
// u2 = 50 + ?, ad = 20, 
// case 1
// 0.90 * 200, 0.90 * 200 
// case 2
// 100/150 * 0.90 * 200 , 50/150 * 0.90 * 200 

  if (betOn === match.team1) {
    moneyPerWinner =
      ((match.team2_abs_amt + match.draw_abs_amt) * 0.9) /
      match.team1_total_bets;
    adminShare = (match.team2_abs_amt + match.draw_abs_amt) * 0.1;
  }
  if (betOn === match.team2) {
    moneyPerWinner =
      ((match.team1_abs_amt + match.draw_abs_amt) * 0.9) /
      match.team2_total_bets;
    adminShare = (match.team1_abs_amt + match.draw_abs_amt) * 0.1;
  }

  if (betOn === "Draw") {
    moneyPerWinner =
      ((match.team1_abs_amt + match.team2_abs_amt) * 0.9) /
      match.draw_total_bets;
    adminShare = (match.team1_abs_amt + match.team2_abs_amt) * 0.1;
  }

  return { moneyPerWinner, adminShare };
};

export const distributeMoney = async (
  winners,
  amountPerWinner,
  adminUsername,
  adminShare
) => {
  let winnersUpdated = [];
  for (const winner of winners) {
    // console.log(winner);
    const winnerUpdated = await User.findOneAndUpdate(
      {
        email: winner.email,
      },
      {
        wallet: winner.wallet + amountPerWinner,
      },
      {
        new: true,
      }
    );

    winnersUpdated.push(winnerUpdated);
  }

  const admin = await Admin.findOne({
    username: adminUsername,
  });

  const adminUpdated = await Admin.findOneAndUpdate(
    {
      username: adminUsername,
    },
    {
      wallet: admin.wallet + adminShare,
    },
    {
      new: true,
    }
  );

  return {
    winnersUpdated: winnersUpdated,
    adminUpdated: adminUpdated,
  };
};
