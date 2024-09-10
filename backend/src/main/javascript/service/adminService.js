import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import adminSchema from "../validationSchema/admin.js";
import matchSchema from "../validationSchema/match.js";
import Admin from "../model/admin.js";
import Match from "../model/match.js";

export const isAdminSchemaValid = (reqQuery) => {
  let errorString = "";

  const errors = adminSchema.validate(reqQuery);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};

export const getAdmin = async (req) => {
  const admin = await Admin.findOne({
    username: req.query.username,
  });

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
    "XYZ1234"
  );

  return token;
};

export const isMatchSchemaValid = (reqBody) => {
  let errorString = "";

  const errors = matchSchema.validate(reqBody);

  for (const error of errors) {
    errorString = errorString + error + " ";
  }

  return errorString;
};

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
