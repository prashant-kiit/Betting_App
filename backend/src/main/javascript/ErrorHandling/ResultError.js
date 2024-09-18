import { ClientError } from "./ClientError.js";

export class ResultError extends ClientError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

export class NoWinnerError extends ResultError {
  constructor(matchId) {
    super(`For ${matchId}. No one won the bet. No money will be distributed.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

export class TeamInvalidError extends ResultError {
  constructor(match, betOn) {
    super(
      `The team ${betOn} in invalid. Choose between ${match.team1} and ${match.team2}.`
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

export class NotTheFirstBetError extends ResultError {
  constructor(matchId) {
    super(`For ${matchId}. You have already placed a bet.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

export class BettingAmountInvalid extends ResultError {
  constructor(matchId, matchMinimumAmount, userWallet) {
    super(
      `For ${matchId}. The betting amount is invalid.The bet amount should aleast be ${matchMinimumAmount} and should be less than your wallet ${userWallet}.`
    );
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}
