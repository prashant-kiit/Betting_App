import { ClientError } from "./ClientError";

export class MatchError extends ClientError {
  constructor(meassage) {
    this.name = this.constructor.name;
    super(`For ${matchId}. The match is not found.`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MatchNotFound extends MatchError {
  constructor(matchId) {
    this.name = this.constructor.name;
    super(`For ${matchId}. The match is not found.`);
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 404;
  }
}

export class MatchInactiveError extends MatchError {
  constructor(matchId) {
    this.name = this.constructor.name;
    super(`For ${matchId}. The match is inactive.`);
    Error.captureStackTrace(this, this.constructor);
    this.httpCode = 400;
  }
}
