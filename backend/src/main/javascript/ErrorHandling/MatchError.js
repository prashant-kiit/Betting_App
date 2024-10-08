import { ClientError } from "./ClientError.js";

export class MatchError extends ClientError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MatchNotFound extends MatchError {
  constructor(matchId) {
    super(`For ${matchId}. The match is not found.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 404;
  }
}

export class MatchInactiveError extends MatchError {
  constructor(matchId) {
    super(`For ${matchId}. The match is inactive.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}

